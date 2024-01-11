import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order;

    useEffect(() => {
        if (!order || !order.number) navigate('/');
    }, [order, navigate]);

    const handlePaymentConfirmation = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment delay
            const response = await axios.post('http://localhost:3001/api/orders', order);
            navigate('/order-confirmation', { state: { orderNumber: response.data.number } });
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className="payment-container">
            <h1>Payment</h1>
            <p>Processing your payment...</p>
            <button onClick={handlePaymentConfirmation}>Confirm Payment</button>
        </div>
    );
};

export default PaymentScreen;
