import React from 'react';
import './Cart.css';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Prepare the data for PlaceOrder component
  const cartData = food_list
    .filter(item => cartItems[item._id] > 0)
    .map(item => ({
      itemId: item._id,
      itemName: item.name,
      price: item.price,
      quantity: cartItems[item._id],
      totalAmount: item.price * cartItems[item._id],
      image: `${url}/images/${item.image}`
    }));

  const totalAmount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2);

  const proceedToCheckout = () => {
    navigate('/placeorder', {
      state: {
        cartItems: cartData,
        totalAmount
      }
    });
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> 
          <p>Title</p> 
          <p>Price</p> 
          <p>Quantity</p> 
          <p>Total</p> 
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p className='cart-items-remove-icon' onClick={() => removeFromCart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}

      </div>

      <div className="cart-bottom">
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
                <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <b>Total</b>
                <b>₹{totalAmount}</b>
            </div>
          </div>
          <button onClick={proceedToCheckout}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
