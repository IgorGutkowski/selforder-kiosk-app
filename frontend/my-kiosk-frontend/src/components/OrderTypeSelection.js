import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTypeSelection = () => {
    const navigate = useNavigate();

    const handleOrderType = (type) => {
        console.log(type);
        navigate('/menu');
    };

    const handleCancelOrder = () => {
        navigate('/');
    };

    return (
        <div className="order-type-container">
            <h2>Proszę wybrać typ zamówienia:</h2>
            <button onClick={() => handleOrderType('dineIn')} className="order-type-button">Zamów na miejscu</button>
            <button onClick={() => handleOrderType('takeAway')} className="order-type-button">Zamów na wynos</button>
            <button onClick={handleCancelOrder} className="cancel-order-button">Anuluj zamówienie</button>
        </div>
    );
};

export default OrderTypeSelection;
