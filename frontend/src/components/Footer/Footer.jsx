import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <Link to="/"><img src={assets.logo_food_site} alt="" /></Link>
            <p>At Foodie, we bring delicious, freshly prepared meals to your doorstep. Our passion is providing a diverse menu that caters to all tastes, with a commitment to quality and convenience. Join us in celebrating the joy of food!</p>
            <div className="footer-social-icons">
                <a href="#"><img src={assets.facebook_icon} alt="" /></a>
                <a href="#"><img src={assets.twitter_icon} alt="" /></a>
                <a href="#"><img src={assets.linkedin_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@foodie.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © foodie.com - All Right Reserved.</p>
    </div>
  );
}

export default Footer;
