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
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);
    const [errorCategories, setErrorCategories] = useState(null);
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
                setLoadingProducts(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setErrorProducts('Failed to load products.');
                setLoadingProducts(false);
            });

        axios.get('http://localhost:3001/api/categories')
            .then(response => {
                setCategories(response.data);
                setLoadingCategories(false);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setErrorCategories('Failed to load categories.');
                setLoadingCategories(false);
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
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <SearchBar onSearchResult={handleSearchResult} />
                <button onClick={handleCancelOrder} className="bg-red-500 text-white font-bold uppercase text-sm px-4 py-2 rounded shadow hover:bg-red-600 transition ease-in-out duration-300">Anuluj zamówienie</button>
            </div>
            <div className="flex p-4">
                <div className="w-1/4 overflow-y-auto">
                    {loadingCategories ? (
                        <p>Loading categories...</p>
                    ) : errorCategories ? (
                        <p>{errorCategories}</p>
                    ) : (
                        <CategoryNavBar categories={categories} onSelectCategory={handleCategoryClick} />
                    )}
                </div>
                <div className="w-2/4 overflow-y-auto">
                    {loadingProducts ? (
                        <p>Loading products...</p>
                    ) : errorProducts ? (
                        <p>{errorProducts}</p>
                    ) : (
                        products.map(product => (
                            <div key={product._id} className="border border-gray-200 rounded shadow-lg p-4 cursor-pointer" onClick={() => handleProductClick(product)}>
                                <img src={product.image} alt={product.name} className="w-full h-40 object-scale-down rounded" />
                                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                                <p className="text-gray-600">Cena: {product.price} zł</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="w-1/4 space-y-4">
                    {selectedProduct && <ProductDetail product={selectedProduct} addToOrder={addToOrder} />}
                    <Order order={order} removeFromOrder={removeFromOrder} setOrder={setOrder}/>
                </div>
            </div>
        </>

    );

};

export default Menu;
