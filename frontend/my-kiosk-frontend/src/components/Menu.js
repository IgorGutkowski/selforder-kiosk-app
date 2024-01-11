import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './SearchBar';
import CategoryNavBar from './CategoryNavBar';
import ProductDetail from './ProductDetail';
import Order from './Order';


const Menu = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [order, setOrder] = useState({
        number: Date.now().toString(), // Convert timestamp to string for the order number
        date: new Date(),
        products: [],
        remarks: '',
        price: 0,
        takeAway: false // Default to false
    });
    const navigate = useNavigate();
    const location = useLocation();

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

    useEffect(() => {
        const isTakeAway = location.state?.orderType === 'takeAway';
        if (isTakeAway) {
            setOrder(prevOrder => ({
                ...prevOrder,
                takeAway: true,
                price: prevOrder.products.reduce((acc, prod) => acc + prod.price, 1) // Start with 1 for the bag
            }));
        } else {
            setOrder(prevOrder => ({
                ...prevOrder,
                takeAway: false,
                price: prevOrder.products.reduce((acc, prod) => acc + prod.price, 0) // No bag fee
            }));
        }
    }, [location.state, order.products]);

    const handleSearchResult = (searchResults) => {
        setProducts(searchResults);
    };

    const handleCancelOrder = () => {
        navigate('/');
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const addToOrder = (product) => {
        setOrder(prevOrder => {
            return {
                ...prevOrder,
                products: [...prevOrder.products, product]
            };
        });
    };

    const onConfirm = () => {
        // Navigate to payment or submit order logic here
        console.log('Order confirmed:', order);
    };

    const removeFromOrder = (index) => {
        setOrder(prevOrder => {
            const newProducts = prevOrder.products.filter((_, i) => i !== index);
            return {
                ...prevOrder,
                products: newProducts
            };
        });
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
                        <div key={product._id} className="product" onClick={() => handleProductClick(product)}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Cena: {product.price} zł</p>
                        </div>
                    ))}
                </div>
                {selectedProduct && <ProductDetail product={selectedProduct} addToOrder={addToOrder} />}
                <Order order={order} removeFromOrder={removeFromOrder} onConfirm={onConfirm} setOrder={setOrder}/>
            </div>
        </>
    );
};

export default Menu;
