import React from 'react';
import { Link } from 'react-router-dom';
import { FaTag } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className="group block h-full">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
                {/* Image Container */}
                <div className="relative h-48 sm:h-64 bg-blue-50 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}

                    {/* Bulk Discount Badge */}
                    {product.pricingTiers && product.pricingTiers.length > 0 && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center">
                            <FaTag className="mr-1" /> Bulk Discounts
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-500 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>

                    <div className="mt-auto pt-2 border-t border-gray-50">
                        <p className="text-sm text-gray-500">Starts at</p>
                        <p className="text-xl font-bold text-gray-900">₹{product.basePrice}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
