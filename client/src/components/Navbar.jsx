import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getCartCount } = useCart();
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold font-serif text-gray-800 tracking-wide">
                            Nivika<span className="text-blue-500">Gifts</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-blue-500 font-medium transition duration-300">Home</Link>
                            <Link to="/shop" className="text-gray-600 hover:text-blue-500 font-medium transition duration-300">Shop</Link>
                            <Link to="/cart" className="text-gray-600 hover:text-blue-500 font-medium transition duration-300 relative">
                                Cart
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {getCartCount()}
                                    </span>
                                )}
                            </Link>
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center text-gray-800 font-medium">
                                        <FaUserCircle className="mr-2 text-blue-500" size={20} />
                                        {user.name}
                                    </span>
                                    <button onClick={logout} className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition">Logout</button>
                                </div>
                            ) : (
                                <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded p-1"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50">Home</Link>
                        <Link to="/shop" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50">Shop</Link>
                        <Link to="/cart" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50">
                            Cart ({getCartCount()})
                        </Link>
                        {user ? (
                            <>
                                <div className="block px-3 py-2 text-base font-medium text-blue-600">Hi, {user.name}</div>
                                <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
