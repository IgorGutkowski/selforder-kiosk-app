import React, {useContext, useEffect, useState} from 'react';
import ProductForm from './ProductForm';
import { useCategoryChange } from '../context/CategoryChangeContext';
import { AdminContext } from '../context/AdminContext';

const ProductsManager = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = 'http://localhost:3001';
    const { triggerCategoryChange } = useCategoryChange();
    const { state } = useContext(AdminContext);
    const adminKey = state.adminKey;

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [triggerCategoryChange]);

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
                    'Admin-Secret-Key': adminKey,
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
        if (window.confirm('Czy na pewno chcesz usunąć ten produkt??')) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Admin-Secret-Key': adminKey,
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
        <div className="admin-container p-5">
            <h2 className="admin-title text-2xl font-semibold mb-4">Zarządzaj Produktami</h2>
            <ProductForm
                onSubmit={addOrUpdateProduct}
                initialData={editingProduct || {}}
                categories={categories}
                setEditingProduct={setEditingProduct}
            />
            {loading && <p>Loading products...</p>}
            {error && <p className="error-message text-red-500">{error}</p>}
            <ul className="admin-list mt-4">
                {products.map((product) => (
                    <li key={product._id} className="product-item bg-white p-4 rounded shadow mb-4">
                        <div className="product-details mb-3">
                            <h3 className="text-lg font-semibold">Nazwa: {product.name}</h3>
                            <p className="text-sm">Cena: {product.price} zł</p>
                            <p className="text-sm">Kategoria: {product.category}</p>
                            <p className="text-sm">Image URL: {product.image || 'N/A'}</p>
                            <p className="text-sm font-semibold">Składniki:</p>
                            <ul className="ingredients-list list-disc list-inside">
                                {product.ingredients.map((ingredient, index) => (
                                    <li key={index} className="text-sm">{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between">
                            <button className="edit bg-yellow-500 text-white font-bold uppercase text-sm px-3 py-1 rounded shadow hover:bg-yellow-600 transition ease-in-out duration-300" onClick={() => setEditingProduct(product)}>Edytuj</button>
                            <button className="delete bg-red-500 text-white font-bold uppercase text-sm px-3 py-1 rounded shadow hover:bg-red-600 transition ease-in-out duration-300" onClick={() => deleteProduct(product._id)}>Usuń</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );


};

export default ProductsManager;
