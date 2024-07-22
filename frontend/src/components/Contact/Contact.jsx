import React from 'react';
import './Contact.css'; // Styling for the Contact Us page
import { assets } from '../../assets/assets';
const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>
          For any inquiries or feedback, please feel free to reach out to us using the contact details below:
        </p>
        <ul>
          <li>Phone: +1-212-456-7890</li>
          <li>Email: contact@letsfood.com</li>
        </ul>
        
        <div className="social-icons">
                <a href="#"><img src={assets.facebook_icon} alt="" /></a>
                <a href="#"><img src={assets.twitter_icon} alt="" /></a>
                <a href="#"><img src={assets.linkedin_icon} alt="" /></a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
