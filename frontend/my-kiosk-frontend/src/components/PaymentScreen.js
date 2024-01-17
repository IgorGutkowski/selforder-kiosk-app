// PaymentScreen.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!order || !order.number) {
            setError('Wystąpił problem ze składaniem zamówienia. Spróbuj ponownie lub skontaktuj się z obsługą.');
        }
    }, [order]);

    const handlePaymentConfirmation = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment delay
            const response = await axios.post('http://localhost:3001/api/orders', order);
            navigate('/order-confirmation', { state: { orderNumber: response.data.number } });
        } catch (error) {
            setError('Wystąpił problem ze składaniem zamówienia. Spróbuj ponownie lub skontaktuj się z obsługą.');
            setIsLoading(false);
        }
    };

    const handleCancelOrder = () => {
        navigate('/'); // Navigate to WelcomeScreen, simulating the cancellation of the order
    };

    return (
        <div className="payment-container">
            <h1>Payment</h1>
            {isLoading ? (
                <p>Processing your payment...</p>
            ) : (
                <>
                    {error && <p className="error-message">{error}</p>}
                    <button onClick={handlePaymentConfirmation} disabled={isLoading}>
                        Potwierdź płatność
                    </button>
                    {error && (
                        <button onClick={handleCancelOrder} className="cancel-order-button">
                            Anuluj zamówienie
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default PaymentScreen;
