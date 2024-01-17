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
        setOrder(prevOrder => ({ ...prevOrder, remarks: remarks }));
        navigate('/payment', { state: { order } });
    };

    return (
        <div className="order-summary">
            <h3>Zamówienie #{order.number}</h3>
            <p>Data: {order.date.toLocaleString()}</p>
            <ul>
                {order.products.map((product, index) => (
                    <li key={index}>
                        {product.name} - {product.price} zł
                        <button onClick={() => removeFromOrder(index)}>X</button>
                    </li>
                ))}
                {order.takeAway && <p>Typ zamówienia: Na wynos (Dodatkowa opłata za papierową torbę)</p>}
            </ul>
            <label htmlFor="order-remarks">Uwagi do zamówienia:</label>
            <textarea
                id="order-remarks"
                value={remarks}
                onChange={handleRemarksChange}
                placeholder="Uwagi do zamówienia..."
            />
            <p>Cena całkowita: {calculateTotalPrice()} zł</p>
            <button onClick={handleConfirmOrder} className="confirm-button">Potwierdź zamówienie</button>
        </div>
    );
};

export default Order;
