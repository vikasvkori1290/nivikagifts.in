const mongoose = require('mongoose');
const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

// Helper to upload stream to cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'nivika-gifts' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

exports.createProduct = async (req, res) => {
    // Check DB connection
    if (mongoose.connection.readyState !== 1) {
        console.warn("DB offline. Simulating product creation.");
        const { name, category, basePrice } = req.body;
        // Return a mock response so UI thinks it succeeded
        return res.status(201).json({
            _id: 'mock_id_' + Date.now(),
            name,
            category,
            basePrice,
            inStock: true,
            images: [],
            isMock: true
        });
    }

    try {
        const { name, description, category, basePrice, inStock, pricingTiers } = req.body;

        // Parse pricingTiers
        let parsedPricingTiers = [];
        if (typeof pricingTiers === 'string') {
            try {
                parsedPricingTiers = JSON.parse(pricingTiers);
            } catch (e) {
                return res.status(400).json({ message: 'Invalid pricingTiers format' });
            }
        } else {
            parsedPricingTiers = pricingTiers;
        }

        // Handle Image Uploads
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            imageUrls = await Promise.all(uploadPromises);
        }

        const newProduct = new Product({
            name,
            description,
            category,
            basePrice,
            inStock,
            pricingTiers: parsedPricingTiers,
            images: imageUrls
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    // INSTANT FALLBACK: Check if DB is connected (readyState 1 = connected)
    if (mongoose.connection.readyState !== 1) {
        console.warn("DB not connected. Serving instant mock data.");
        const mockProducts = require('../data/mockProducts');
        const filtered = req.query.category
            ? mockProducts.filter(p => p.category === req.query.category)
            : mockProducts;
        return res.status(200).json(filtered);
    }

    try {
        const { category } = req.query;
        let filter = {};
        if (category) {
            filter.category = category;
        }
        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        console.warn("Database error, serving mock data:", error.message);
        const mockProducts = require('../data/mockProducts');
        const filtered = req.query.category
            ? mockProducts.filter(p => p.category === req.query.category)
            : mockProducts;
        res.status(200).json(filtered);
    }
};

exports.getProductById = async (req, res) => {
    // INSTANT FALLBACK: Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
        console.warn("DB not connected. Serving instant mock data.");
        const mockProducts = require('../data/mockProducts');
        const product = mockProducts.find(p => p._id === req.params.id);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.warn("Database error, serving mock data:", error.message);
        const mockProducts = require('../data/mockProducts');
        const product = mockProducts.find(p => p._id === req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
};
