import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderNumber = location.state?.orderNumber;

    useEffect(() => {
        // Set a timeout to navigate back to the WelcomeScreen after 10 seconds
        const timeoutId = setTimeout(() => {
            navigate('/');
        }, 10000);

        // Clean up the timeout if the component unmounts earlier
        return () => clearTimeout(timeoutId);
    }, [navigate]);

    return (
        <div className="confirmation-container">
            <h1>Dziękujemy za zamówienie!</h1>
            <p>Numer twojego zamówienia {orderNumber}.</p>
            <p>Życzymy smacznego!</p>
        </div>
    );
};

export default OrderConfirmationScreen;
