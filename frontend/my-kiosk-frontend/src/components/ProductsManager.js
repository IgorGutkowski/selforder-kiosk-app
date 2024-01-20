import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';

const ProductsManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = 'http://localhost:3001';

    useEffect(() => {
        fetchProducts();
        fetchCategories();

    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`); // Use the API base URL
            if (!response.ok) {
                throw new Error('Error fetching products');
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setError('Failed to load products.');
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categories`); // Use the API base URL
            if (!response.ok) {
                throw new Error('Error fetching categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories.');
        }
    };

    const addOrUpdateProduct = async (product) => {
        const method = editingProduct ? 'PUT' : 'POST';
        const id = editingProduct ? `/${editingProduct._id}` : '';
        const url = `${API_BASE_URL}/api/admin/products${id}`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Admin-Secret-Key': 'admin', // Replace with actual admin key
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                fetchProducts();
                setEditingProduct(null); // Clear editing state
                setError(null); // Clear any previous errors
            } else {
                const responseData = await response.json();
                console.error('Failed to submit product', responseData);
                setError(responseData.message || 'Failed to submit product');
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            setError(error.message || 'Failed to submit product');
        }
    };




    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Admin-Secret-Key': 'admin', // Replace with actual admin key
                    },
                });

                if (response.ok) {
                    setProducts(products.filter(product => product._id !== id)); // Update the state immediately
                } else {
                    const responseData = await response.json(); // Log response data
                    console.error('Failed to delete product', responseData);
                    setError(responseData.message || 'Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                setError(error.message || 'Failed to delete product');
            }
        }
    };


    return (
        <div>
            <h2>Manage Products</h2>
            <ProductForm
                onSubmit={addOrUpdateProduct}
                initialData={editingProduct || {}}
                categories={categories}
            />
            {loading && <p>Loading products...</p>}
            {error && <p>{error}</p>}
            <div>
                {products.map((product) => (
                    <div key={product._id}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <p>Category: {product.category}</p>
                        <button onClick={() => setEditingProduct(product)}>Edit</button>
                        <button onClick={() => deleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default ProductsManager;
