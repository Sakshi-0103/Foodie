import React from 'react';
import './Success.css';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className='success-page'>
            <div className='success-message'>
                <h1>Thank You for Your Order!</h1>
                <p>Your order has been confirmed and is now being prepared with care. We appreciate your trust in Fomato.</p>
                <p>Based on our verification process, your meal will arrive shortly. We hope you enjoy every bite!</p>
                <div className='success-buttons'>
                    <button onClick={() => navigate('/')}>Check More</button>
                    <button onClick={() => navigate('/myorders')}>View My Orders</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
