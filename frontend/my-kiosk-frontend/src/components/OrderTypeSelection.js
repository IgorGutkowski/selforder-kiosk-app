import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTypeSelection = () => {
    const navigate = useNavigate();

    const handleOrderType = (type) => {
        console.log(type);
    };

    const handleCancelOrder = () => {
        navigate('/');
    };

    return (
        <div className="order-type-container">
            <h2>Please select your order type:</h2>
            <button onClick={() => handleOrderType('dineIn')}>Zamów na miejscu</button>
            <button onClick={() => handleOrderType('takeAway')}>Zamów na wynos</button>
            <button onClick={handleCancelOrder} className="cancel-order-button">Cancel Order</button>
        </div>
    );
};

export default OrderTypeSelection;
