import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import CategoryNavBar from './CategoryNavBar';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

        axios.get('http://localhost:3001/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleCategoryClick = (categoryName) => {
        if (categoryName === '') {
            axios.get('http://localhost:3001/api/products')
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching all products:', error);
                });
        } else {
            axios.get(`http://localhost:3001/api/products/category/${categoryName}`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching products by category:', error);
                });
        }
    };

    const handleSearchResult = (searchResults) => {
        setProducts(searchResults);
    };

    const handleCancelOrder = () => {
        navigate('/');
    };

    return (
        <>
            <div className="menu-header">
                <SearchBar onSearchResult={handleSearchResult} />
                <button onClick={handleCancelOrder} className="cancel-order-button">Anuluj zamówienie</button>
            </div>
            <div className="menu-container">
                <CategoryNavBar categories={categories} onSelectCategory={handleCategoryClick} />
                <div className="menu">
                    {products.map(product => (
                        <div key={product._id} className="product">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Cena: {product.price} zł</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Menu;
