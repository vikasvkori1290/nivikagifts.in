import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaChartLine } from 'react-icons/fa';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import OrderList from './pages/OrderList';

const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <h1 className="text-xl font-bold font-serif tracking-wide">Nivika<span className="text-blue-500">Admin</span></h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <Link to="/" className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive('/')}`}>
            <FaChartLine className="mr-3" /> Dashboard
          </Link>
          <Link to="/products" className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive('/products')}`}>
            <FaBoxOpen className="mr-3" /> Products
          </Link>
          <Link to="/orders" className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive('/orders')}`}>
            <FaClipboardList className="mr-3" /> Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          &copy; 2026 Nivika Gifts
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          import AddProduct from './pages/AddProduct';

          // ... (imports)

          // ... App component ...
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
