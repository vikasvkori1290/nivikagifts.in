const mockOrders = [
    {
        _id: '101',
        customerName: 'Rahul Sharma',
        phone: '9876543210',
        address: '123, MG Road, Bangalore',
        items: [
            {
                product: { name: 'Customized Coffee Mug', images: ['https://via.placeholder.com/150'] },
                quantity: 10,
                price: 250
            }
        ],
        totalAmount: 2500,
        status: 'Pending',
        createdAt: new Date().toISOString()
    },
    {
        _id: '102',
        customerName: 'Priya Singh',
        phone: '9988776655',
        address: '456, Park Street, Kolkata',
        items: [
            {
                product: { name: 'Premium Notebook', images: ['https://via.placeholder.com/150'] },
                quantity: 5,
                price: 450
            }
        ],
        totalAmount: 2250,
        status: 'Shipped',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    }
];

module.exports = mockOrders;
