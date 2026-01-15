module.exports = [
    {
        _id: "mock_1",
        name: "Customized Coffee Mug",
        description: "High-quality ceramic mug with personalized printing. Perfect for corporate gifts or personal occasions. Dishwasher and microwave safe.",
        category: "Mugs",
        basePrice: 250,
        inStock: true,
        images: ["https://placehold.co/600x600?text=Custom+Mug"],
        pricingTiers: [
            { minQuantity: 10, pricePerUnit: 220 },
            { minQuantity: 50, pricePerUnit: 200 },
            { minQuantity: 100, pricePerUnit: 180 }
        ]
    },
    {
        _id: "mock_2",
        name: "Premium Notebook",
        description: "Elegant leather-finish notebook with ivory paper. Available in multiple colors. Great for branding.",
        category: "Stationery",
        basePrice: 450,
        inStock: true,
        images: ["https://placehold.co/600x600?text=Premium+Notebook"],
        pricingTiers: [
            { minQuantity: 20, pricePerUnit: 400 },
            { minQuantity: 100, pricePerUnit: 350 }
        ]
    },
    {
        _id: "mock_3",
        name: "Metal Keychain",
        description: "Durable metal keychain with laser engraving options. A classic promotional item.",
        category: "Accessories",
        basePrice: 80,
        inStock: true,
        images: ["https://placehold.co/600x600?text=Metal+Keychain"],
        pricingTiers: [
            { minQuantity: 50, pricePerUnit: 65 },
            { minQuantity: 200, pricePerUnit: 50 },
            { minQuantity: 500, pricePerUnit: 40 }
        ]
    },
    {
        _id: "mock_4",
        name: "Eco-Friendly Bamboo Pen",
        description: "Sustainable bamboo pen with smooth ink flow. Show your commitment to the environment.",
        category: "Stationery",
        basePrice: 60,
        inStock: true,
        images: ["https://placehold.co/600x600?text=Bamboo+Pen"],
        pricingTiers: [
            { minQuantity: 100, pricePerUnit: 45 },
            { minQuantity: 500, pricePerUnit: 35 }
        ]
    },
    {
        _id: "mock_5",
        name: "Custom T-Shirt",
        description: "100% cotton t-shirt with screen printing. Comfortable fit and vibrant colors.",
        category: "Apparel",
        basePrice: 500,
        inStock: false, // Testing out of stock
        images: ["https://placehold.co/600x600?text=Custom+T-Shirt"],
        pricingTiers: [
            { minQuantity: 10, pricePerUnit: 450 },
            { minQuantity: 50, pricePerUnit: 400 }
        ]
    }
];
