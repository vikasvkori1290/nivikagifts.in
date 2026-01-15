import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaPlus, FaTrash } from 'react-icons/fa';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        basePrice: '',
        inStock: true
    });
    const [images, setImages] = useState([]);
    const [pricingTiers, setPricingTiers] = useState([{ minQuantity: '', pricePerUnit: '' }]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleTierChange = (index, field, value) => {
        const newTiers = [...pricingTiers];
        newTiers[index][field] = value;
        setPricingTiers(newTiers);
    };

    const addTier = () => {
        setPricingTiers([...pricingTiers, { minQuantity: '', pricePerUnit: '' }]);
    };

    const removeTier = (index) => {
        setPricingTiers(pricingTiers.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('basePrice', formData.basePrice);
        data.append('inStock', formData.inStock);
        data.append('pricingTiers', JSON.stringify(pricingTiers));

        for (let i = 0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        try {
            await axios.post('http://localhost:5000/api/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Product Created Successfully!');
            navigate('/products');
        } catch (error) {
            console.error(error);
            alert('Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" name="name" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows="3" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="Corporate Gifts">Corporate Gifts</option>
                            <option value="Wedding Specials">Wedding Specials</option>
                            <option value="Birthday Hampers">Birthday Hampers</option>
                            <option value="Personalized">Personalized</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
                        <input type="number" name="basePrice" required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Images</label>
                    <input type="file" multiple onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>

                {/* Pricing Tiers */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bulk Pricing Tiers</label>
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="flex gap-4 mb-2 items-end">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500">Min Quantity</label>
                                <input type="number" placeholder="e.g. 10" className="w-full px-3 py-1 border rounded" value={tier.minQuantity} onChange={(e) => handleTierChange(index, 'minQuantity', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500">Price Per Unit</label>
                                <input type="number" placeholder="e.g. 200" className="w-full px-3 py-1 border rounded" value={tier.pricePerUnit} onChange={(e) => handleTierChange(index, 'pricePerUnit', e.target.value)} />
                            </div>
                            <button type="button" onClick={() => removeTier(index)} className="text-red-500 p-2"><FaTrash /></button>
                        </div>
                    ))}
                    <button type="button" onClick={addTier} className="text-sm text-blue-600 font-medium flex items-center mt-2"><FaPlus className="mr-1" /> Add Tier</button>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">In Stock</label>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-bold shadow-lg transition-transform transform active:scale-95">
                    {loading ? 'Creating...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
