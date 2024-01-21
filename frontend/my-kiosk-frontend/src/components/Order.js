import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Order = ({ order, setOrder, removeFromOrder }) => {
    const [remarks, setRemarks] = useState(order.remarks || '');
    const navigate = useNavigate();

    const calculateTotalPrice = () => {
        // Include paper bag fee if it's a takeaway order
        return order.products.reduce((total, product) => total + product.price, order.takeAway ? 1 : 0);
    };

    const handleRemarksChange = (e) => {
        const updatedRemarks = e.target.value;
        setRemarks(updatedRemarks);
        setOrder((prevOrder) => ({
            ...prevOrder,
            remarks: updatedRemarks,
        }));
    };

    const handleConfirmOrder = () => {
        if (order.products.length > 0) {
            if (remarks.length <= 200) {
                setOrder((prevOrder) => ({ ...prevOrder, remarks: remarks }));
                navigate('/payment', { state: { order } });
            } else {
                window.alert("Uwagi nie mogę przekroczyć 200 znaków.");
            }
        } else {
            window.alert("Nie możesz złożyć zamówienia bez produktów.");
        }
    };


    return (
        <div className="bg-white m-2 p-5 border border-gray-200 rounded shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Zamówienie #{order.number}</h3>
            <p>Data: {order.date.toLocaleString()}</p>
            <ul className="list-none p-0 m-0">
                {order.products.map((product, index) => (
                    <li key={index} className="flex justify-between items-center border-b border-gray-200 py-2">
                        {product.name} - {product.price} zł
                        <button onClick={() => removeFromOrder(index)} className="text-red-500 hover:text-red-600 transition ease-in-out duration-300">X</button>
                    </li>
                ))}
            </ul>
            {order.takeAway && <p className="pt-2">Typ zamówienia: Na wynos</p>}
            <label htmlFor="order-remarks" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Uwagi do zamówienia:</label>
            <textarea
                id="order-remarks"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                value={remarks}
                onChange={handleRemarksChange}
                placeholder="Uwagi do zamówienia..."
                maxLength={200}
            />
            <p className="mt-4">Cena całkowita: {calculateTotalPrice()} zł</p>
            <button
                onClick={handleConfirmOrder}
                className="bg-amber-900 text-white font-bold uppercase text-sm px-4 py-2 mt-2.5 rounded shadow hover:bg-amber-950 transition ease-in-out duration-300"
            >
                Potwierdź zamówienie
            </button>

        </div>
    );

};

export default Order;
