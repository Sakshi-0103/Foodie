import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
    const [payment, setPayment] = useState("cod");
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const [customerName, setCustomerName] = useState('');
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems, deliveryCharge } = useContext(StoreContext);
    const navigate = useNavigate();

    // Handle form field changes
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    // Place order for COD or proceed to payment page for online payment
    const handlePaymentProceed = async (e) => {
        e.preventDefault();

        const orderItems = food_list.filter(item => cartItems[item._id] > 0).map(item => ({
            itemName: item.name,
            amount: item.price * cartItems[item._id],
            quantity: cartItems[item._id]
        }));

        if (payment === "online") {
            setCustomerName(`${data.firstName} ${data.lastName}`);
            setProducts(orderItems);
            setTotalAmount(getTotalCartAmount() + deliveryCharge);

            // Navigate to the Pay component
            navigate('/pay', {
                state: {
                    customerName: `${data.firstName} ${data.lastName}`,
                    products: orderItems,
                    totalAmount: getTotalCartAmount() + deliveryCharge
                }
            });
        } else {
            await placeOrder(orderItems);
        }
    };

    // Place the order for COD
    const placeOrder = async (orderItems) => {
        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        };

        try {
            const response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                setCartItems({});
                toast.success(response.data.message);
                navigate("/success"); // Redirect to the Success Page
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("Please sign in to place an order.");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]);

    return (
        <div className="place-order-container">
            <form onSubmit={handlePaymentProceed} className='place-order'>
                <div className="place-order-left">
                    <p className='title'>Delivery Information</p>
                    <div className="multi-field">
                        <input
                            type="text"
                            name='firstName'
                            onChange={onChangeHandler}
                            value={data.firstName}
                            placeholder='First name'
                            required
                        />
                        <input
                            type="text"
                            name='lastName'
                            onChange={onChangeHandler}
                            value={data.lastName}
                            placeholder='Last name'
                            required
                        />
                    </div>

                    <input
                        type="email"
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        placeholder='Email address'
                        required
                    />
                    <input
                        type="text"
                        name='street'
                        onChange={onChangeHandler}
                        value={data.street}
                        placeholder='Street'
                        required
                    />
                    <div className="multi-field">
                        <input
                            type="text"
                            name='city'
                            onChange={onChangeHandler}
                            value={data.city}
                            placeholder='City'
                            required
                        />
                        <input
                            type="text"
                            name='state'
                            onChange={onChangeHandler}
                            value={data.state}
                            placeholder='State'
                            required
                        />
                    </div>
                    <div className="multi-field">
                        <input
                            type="text"
                            name='zipcode'
                            onChange={onChangeHandler}
                            value={data.zipcode}
                            placeholder='Zip code'
                            required
                        />
                        <input
                            type="text"
                            name='country'
                            onChange={onChangeHandler}
                            value={data.country}
                            placeholder='Country'
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name='phone'
                        onChange={onChangeHandler}
                        value={data.phone}
                        placeholder='Phone'
                        required
                    />
                </div>

                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>₹{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>₹{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b>
                            </div>
                        </div>
                    </div>

                    <div className="payment">
                        <h2>Payment Method</h2>
                        <div onClick={() => setPayment("cod")} className="payment-option">
                            <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="COD" />
                            <p>COD (Cash on delivery)</p>
                        </div>

                        <div onClick={() => setPayment("online")} className="payment-option">
                            <img src={payment === "online" ? assets.checked : assets.un_checked} alt="Online" />
                            <p>Pay Online</p>
                        </div>
                    </div>

                    <button className='place-order-submit' type='submit'>
                        {payment === "cod" ? "Place Order" : "Proceed To Payment"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PlaceOrder;
