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

            const response = await axios.post('http://localhost:3001/api/orders', order, {
                headers: {
                    'Paid-Secret-Key': 'order_paid'
                }
            });

            navigate('/order-confirmation', { state: { orderNumber: response.data.number } });
        } catch (error) {
            setError('Wystąpił problem ze składaniem zamówienia. Spróbuj ponownie lub skontaktuj się z obsługą.');
            setIsLoading(false);
        }
    };


    const handleCancelOrder = () => {
        navigate('/'); // Navigate to WelcomeScreen, simulating the cancellation of the order
    };

    // PaymentContainer.jsx
    // PaymentContainer.jsx
    return (
        <div className="flex flex-col items-center justify-center  py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">Payment</h1>
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
                </div>
            ) : (
                <>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        onClick={handlePaymentConfirmation}
                        disabled={isLoading}
                        className={`bg-green-500 text-white text-lg font-bold py-2 px-4 rounded shadow hover:bg-green-600 focus:outline-none focus:shadow-outline transition ease-in-out duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Potwierdź płatność
                    </button>
                    {error && (
                        <button
                            onClick={handleCancelOrder}
                            className="mt-4 bg-red-500 text-white text-lg font-bold py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:shadow-outline transition ease-in-out duration-300"
                        >
                            Anuluj zamówienie
                        </button>
                    )}
                </>
            )}
        </div>
    );


};

export default PaymentScreen;
