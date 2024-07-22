import React, { useState, useEffect } from 'react';
import './Pay.css'; // Import your CSS for styling
import { useLocation, useNavigate } from 'react-router-dom';
import ScannerImage from "../../assets/phonePay.jpg";
import Visa from "../../assets/visa icon.jpeg";
import Rupay from "../../assets/rupay-icon.jpeg";
import MasterCard from "../../assets/mastercard-icon.jpeg"

const Pay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showScanner, setShowScanner] = useState(true); // State to toggle scanner view
    const [customerName, setCustomerName] = useState(location.state.customerName || '');
    const [products, setProducts] = useState(location.state.products || []);
    const [totalAmount, setTotalAmount] = useState(location.state.totalAmount || 0);
    const [countdown, setCountdown] = useState(300); // Countdown in seconds (5 minutes)
    const [timerId, setTimerId] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimerId(timer);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            clearInterval(timerId);
            alert("Payment timeout. Redirecting to previous page.");
            navigate(-1); // Redirect to previous page on timeout
        }
    }, [countdown]);

    const handleReceiptUpload = (e) => {
        const file = e.target.files[0];
        // Handle file upload logic here if needed
    }

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/success"); // Redirect to success page
    }

    const handleOptionChange = (option) => {
        if (option === 'scanner') {
            setShowScanner(true);
        } else {
            setShowScanner(false);
        }
    }

    return (
        <div className="pay-container">
            <form onSubmit={handleSubmit} className="pay-form">
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="products">Product Items</label>
                    {products.map((product, index) => (
                        <div key={index} className="product-item">
                            <input
                                type="text"
                                placeholder={`Product ${index + 1}`}
                                value={product.itemName}
                                readOnly
                            />
                            <input
                                type="text"
                                placeholder="Amount"
                                value={`₹${product.amount}`}
                                readOnly
                            />
                        </div>
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Total Amount</label>
                    <input
                        type="text"
                        id="amount"
                        value={`₹${totalAmount}`}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="receipt">Receipt Upload</label>
                    <input
                        type="file"
                        id="receipt"
                        accept="image/*, .pdf"
                        onChange={handleReceiptUpload}
                        required
                    />
                </div>

                <div className="buttons">
                    <button type="button" className="back-btn" onClick={handleBack}>Back</button>
                    <button type="submit" className="submit-btn">Submit</button>
                </div>

                <div className="countdown">
                    {`Time left: ${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}
                </div>
            </form>

            <div className="payment-options">
                <div className="disclaimer">
                    <p>Disclaimer: Please ensure that all information provided is accurate. Incorrect information may result in order processing delays or cancellation.</p>
                </div>

                <div className="payment-options">
                    <div className="payment-option">
                        <input
                            type="radio"
                            id="scannerOption"
                            name="paymentOption"
                            value="scanner"
                            checked={showScanner}
                            onChange={() => handleOptionChange('scanner')}
                        />
                        <label htmlFor="scannerOption">UPI Scanner</label>
                    </div>

                    <div className="payment-option">
                        <input
                            type="radio"
                            id="cardOption"
                            name="paymentOption"
                            value="card"
                            checked={!showScanner}
                            onChange={() => handleOptionChange('card')}
                        />
                        <label htmlFor="cardOption">Card Payment</label>
                    </div>

                    {showScanner ? (
                        <img src={ScannerImage} alt="Scanner" className="scanner-image" />
                    ) : (
                        <div className="card-options">
                            <div className="card-icons">
                                <img src={Visa} alt="Visa" />
                                <img src={Rupay} alt="Rupay" />
                                <img src={MasterCard} alt="MasterCard" />
                                {/* Add more card icons as needed */}
                            </div>
                            <div className="card-details">
                                <input type="text" placeholder="Card Number" />
                                <input type="text" placeholder="Expiry Date" />
                                <input type="text" placeholder="CSV" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Pay;