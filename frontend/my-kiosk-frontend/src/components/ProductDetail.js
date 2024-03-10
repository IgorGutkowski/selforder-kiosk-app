import React from 'react';

const ProductDetail = ({ product, addToOrder }) => {
    if (!product) return null;

    return (
        <div className="bg-white m-2 p-5 border border-gray-200 rounded shadow">
            <h2 className="text-xl font-bold mb-4">{product.name}</h2>
            <div className="flex justify-center items-center overflow-hidden w-full h-48 rounded-lg mb-4">
                <img src={product.image} alt={product.name} className="object-scale-down max-w-full max-h-full" />
            </div>
            <p className="text-lg font-medium">Cena: {product.price} zł</p>
            <p className="text-gray-700 mb-4">Składniki: {product.ingredients.join(', ')}</p>
            <button
                onClick={() => addToOrder(product)}
                className="bg-amber-900 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:bg-amber-700 transition ease-in-out duration-300"
            >
                Dodaj do zamówienia
            </button>
        </div>
    );




};

export default ProductDetail;
