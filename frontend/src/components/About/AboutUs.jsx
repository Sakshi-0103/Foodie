import React from 'react';
import './AboutUs.css'; // Import your CSS file for styling
import Navbar from '../Navbar/Navbar'; // Assuming Navbar is located in Navbar.jsx
import { assets } from '../../assets/assets'; // Assuming you have assets imported for images

const AboutUs = () => {
    return (
        <div className="about-us-container">
           
            <section className="about-us-section">
                <div className="about-us-content">
                    <h1>About Us</h1>
                    <img src={assets.logo_food_site} alt="Fomato Logo" className="about-us-logo" />
                    <p className="about-us-text">
                        At Fomato, we are passionate about delivering delicious meals right to your doorstep.
                        Our mission is to provide convenient, high-quality food delivery services that cater to
                        every taste and occasion. Whether you're craving a quick lunch, planning a family dinner,
                        or celebrating a special event, Fomato is here to make your dining experience memorable.
                    </p>
                    <p className="about-us-text">
                        Founded with a commitment to culinary excellence and customer satisfaction, we strive to
                        exceed expectations with every order. From our diverse menu selection to our prompt delivery
                        service, we ensure that your food journey with Fomato is nothing short of exceptional.
                    </p>
                    <p className="about-us-text">
                        Join us in celebrating the joy of food. Explore our menu, place your order with ease,
                        and let us take care of the rest. Your satisfaction is our priority, and we look forward
                        to serving you delicious meals, one order at a time.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
