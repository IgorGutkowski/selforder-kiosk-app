import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTypeSelection = () => {
    const navigate = useNavigate();

    const handleOrderType = (type) => {
        navigate('/menu', { state: { orderType: type } });
    };

    const handleCancelOrder = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-between  bg-white p-3 pt-32">
            <div className="w-full max-w-xs mx-auto">
                <h2 className="text-2xl mb-4 text-center">Proszę wybrać typ zamówienia:</h2>
                <button onClick={() => handleOrderType('dineIn')} className="bg-yellow-500 text-black font-bold uppercase text-md px-5 py-2 rounded shadow hover:bg-yellow-600 transition ease-in-out duration-300 w-full my-1">Zamów na miejscu</button>
                <button onClick={() => handleOrderType('takeAway')} className="bg-yellow-500 text-black font-bold uppercase text-md px-5 py-2 rounded shadow hover:bg-yellow-600 transition ease-in-out duration-300 w-full my-1">Zamów na wynos</button>
                <button onClick={handleCancelOrder} className="bg-red-500 text-white font-bold uppercase text-md px-5 py-2 rounded shadow hover:bg-red-600 transition ease-in-out duration-300 w-full my-1">Anuluj zamówienie</button>
            </div>
        </div>
    );



};

export default OrderTypeSelection;
