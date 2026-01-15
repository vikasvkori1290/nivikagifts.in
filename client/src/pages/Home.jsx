import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTruck, FaStar, FaGift, FaArrowRight } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setFeaturedProducts(res.data.slice(0, 4));
            } catch (err) {
                console.error("Error loading featured products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const categories = [
        { name: "Corporate Gifts", color: "bg-blue-50 text-blue-800 border border-blue-100" },
        { name: "Wedding Specials", color: "bg-pink-50 text-pink-700 border border-pink-100" },
        { name: "Birthday Hampers", color: "bg-purple-50 text-purple-700 border border-purple-100" },
        { name: "Personalized", color: "bg-white text-blue-600 border border-blue-200" },
    ];

    return (
        <div className="bg-white min-h-screen font-sans">

            {/* 1. Hero Section - Blue 500 */}
            <section className="relative bg-blue-500 text-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="relative container mx-auto z-10 text-white">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-white">
                        Make Every Moment <br className="hidden sm:block" />
                        <span className="text-blue-100">Unforgettable</span>
                    </h1>
                    <p className="mt-4 text-xl text-blue-50 max-w-2xl mx-auto mb-8">
                        Discover a curated collection of premium gifts for weddings, corporate events, and personal celebrations.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/shop" className="px-8 py-3 bg-white text-blue-600 font-bold rounded-full transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                            Shop Now
                        </Link>
                        <Link to="/contact" className="px-8 py-3 bg-transparent border-2 border-blue-200 text-white hover:bg-blue-600 hover:border-blue-600 font-bold rounded-full transition-all">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Features / Value Props */}
            <section className="py-12 bg-white border-b border-gray-50">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center group">
                        <div className="p-4 bg-blue-50 rounded-full text-blue-500 mb-4 text-2xl group-hover:bg-blue-100 transition-colors">
                            <FaGift />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Unique Selection</h3>
                        <p className="text-gray-500 text-sm mt-2">Handpicked items you won't find anywhere else.</p>
                    </div>
                    <div className="flex flex-col items-center group">
                        <div className="p-4 bg-blue-50 rounded-full text-blue-500 mb-4 text-2xl group-hover:bg-blue-100 transition-colors">
                            <FaStar />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Premium Quality</h3>
                        <p className="text-gray-500 text-sm mt-2">Guaranteed quality on every single order.</p>
                    </div>
                    <div className="flex flex-col items-center group">
                        <div className="p-4 bg-blue-50 rounded-full text-blue-500 mb-4 text-2xl group-hover:bg-blue-100 transition-colors">
                            <FaTruck />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Fast Delivery</h3>
                        <p className="text-gray-500 text-sm mt-2">Reliable shipping across the country.</p>
                    </div>
                </div>
            </section>

            {/* 3. Shop by Category */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Explore Categories</h2>
                        <p className="text-gray-500 mt-1">Find the perfect gift for...</p>
                    </div>
                    <Link to="/shop" className="text-blue-500 font-semibold hover:underline hidden sm:block">View All</Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat, idx) => (
                        <div key={idx} className={`${cat.color} rounded-xl p-6 h-32 flex items-center justify-center text-center cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1`}>
                            <span className="font-bold text-lg">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Featured Products */}
            <section className="py-16 bg-blue-50/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">Trending Now</h2>
                        <Link to="/shop" className="mt-4 sm:mt-0 flex items-center text-blue-500 font-semibold hover:text-blue-600 transition-colors">
                            View Collection <FaArrowRight className="ml-2 text-sm" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No products available at the moment.</p>
                    )}
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-20 bg-blue-50 text-center px-4">
                <h2 className="text-3xl font-bold mb-4 text-blue-900">Join our Celebration Club</h2>
                <p className="text-blue-800 mb-8 max-w-lg mx-auto">Subscribe to get exclusive offers, early access to new collections, and party planning tips.</p>
                <div className="max-w-md mx-auto flex gap-2">
                    <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg text-gray-800 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors">Subscribe</button>
                </div>
            </section>

        </div>
    );
};

export default Home;
