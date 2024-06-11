import React from 'react';
import UserDetailsForm from '../components/WebComponent/Web.UserDetailsCart';
import CartSummary from '../components/WebComponent/Web.CartBillSummmary';
import Header from '../components/WebComponent/WebHeader';
import Footer from '../components/WebComponent/WebFooter';
import '../styles/Checkout.css';

const Checkout = () => {
    return (
        <div>
            <Header />
        <div className="checkout-container"style={{ paddingTop: '60px' }}>
            <div className="user-details">
                <h2>User Details</h2>
                <UserDetailsForm />
            </div>
            <div className="cart-summary">
                <h2>Order Summary</h2>
                <CartSummary />
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default Checkout;
