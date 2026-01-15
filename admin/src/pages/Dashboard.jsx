import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, ordersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/products'),
                    axios.get('http://localhost:5000/api/orders')
                ]);

                const products = productsRes.data;
                const orders = ordersRes.data;
                const revenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

                setStats({
                    products: products.length,
                    orders: orders.length,
                    revenue: revenue
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-sm uppercase tracking-wide">Total Sales</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{stats.revenue.toLocaleString()}</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-sm uppercase tracking-wide">Total Orders</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.orders}</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-500 text-sm uppercase tracking-wide">Active Products</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.products}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
