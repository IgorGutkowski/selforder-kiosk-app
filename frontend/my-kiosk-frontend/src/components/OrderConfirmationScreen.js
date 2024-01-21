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
        navigate('/');
    };


    if (!orderNumber) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Wystąpił błąd w przyjęciu zamówienia.</h1>
                <p className="mb-6">Przepraszamy za niedogodności. Prosimy spróbować złożyć zamówienie jeszcze raz.</p>
                <button
                    onClick={handleCancelOrder}
                    className="bg-red-500 text-white font-bold uppercase text-lg px-6 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:shadow-outline transition ease-in-out duration-300"
                >
                    Zacznij od nowa</button>
            </div>
        );
    }


    return (
        <div className="flex flex-col items-center justify-center  py-8 px-4">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center transform transition-all scale-95 hover:scale-105">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Dziękujemy za zamówienie!</h1>
                <p className="text-lg mb-2">Numer twojego zamówienia: <span className="font-semibold">{orderNumber}</span>.</p>
                <p className="text-lg">Życzymy smacznego!</p>
                <div className="mt-8">
                    <svg className="animate-bounce w-6 h-6 mx-auto text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>
        </div>
    );

};

export default OrderConfirmationScreen;
