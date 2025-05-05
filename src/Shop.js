import React from 'react'

const Shop = () => {
    const productDetails = [
        {
            product_name: "Laptop",
            price: "45,000",
            description: "At better price",
            brand: "Dell"
        },
        {
            product_name: "Smartphone",
            price: "25,000",
            description: "At better price",
            brand: "Samsung"
        },
        {
            product_name: "Headphones",
            price: "2,000",
            description: "At better price",
            brand: "Sony"
        }
    ];
    return (
        <div>
            <h2>Shop</h2>
            <p>Get best products at best deals!</p>

            <ul>
                {productDetails.map((item, index) => (
                    <li key={index}>
                        <h3>{item.product_name}</h3>
                        <p>Price: {item.price}</p>
                        <p>Description: {item.description}</p>
                        <p>Brand: {item.brand}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Shop