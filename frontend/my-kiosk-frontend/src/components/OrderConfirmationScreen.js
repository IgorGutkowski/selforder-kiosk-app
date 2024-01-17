// OrderConfirmationScreen.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderNumber = location.state?.orderNumber;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, [navigate]);

    const handleCancelOrder = () => {
        navigate('/'); // Navigate to WelcomeScreen immediately
    };

    if (!orderNumber) {
        return (
            <div className="error-container">
                <h1>Wystąpił błąd w przyjęciu zamówienia.</h1>
                <button onClick={handleCancelOrder} className="cancel-order-button">
                    Zacznij od nowa
                </button>
            </div>
        );
    }

    return (
        <div className="confirmation-container">
            <h1>Dziękujemy za zamówienie!</h1>
            <p>Numer twojego zamówienia: {orderNumber}.</p>
            <p>Życzymy smacznego!</p>
        </div>
    );
};

export default OrderConfirmationScreen;
