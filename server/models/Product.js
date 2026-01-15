const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: [{
        type: String, // Array of Cloudinary URLs
        required: true
    }],
    pricingTiers: [{
        minQuantity: {
            type: Number,
            required: true
        },
        pricePerUnit: {
            type: Number,
            required: true
        },
        _id: false // Disable auto-ID for subdocuments if not needed, but optional
    }],
    basePrice: {
        type: Number,
        required: true,
        description: "Price for single sample purchases"
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
