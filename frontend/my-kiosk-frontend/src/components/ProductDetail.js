import React from 'react';

const ProductDetail = ({ product, addToOrder }) => {
    if (!product) return null;

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>Cena: {product.price} zł</p>
            <p>Składniki: {product.ingredients.join(', ')}</p>
            <button onClick={() => addToOrder(product)} className="button-add-to-order">Dodaj do zamówienia</button>
        </div>
    );
};

export default ProductDetail;
