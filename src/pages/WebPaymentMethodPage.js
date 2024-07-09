import React from 'react';
import WebHeader from '../components/WebComponent/WebHeader';
import WebFooter from '../components/WebComponent/WebFooter';

const PaymentMethods = () => {
    const services = [
        {
            title: 'In Store Payment',
            description: 'You can pay for your purchases in-store using cash, credit or debit cards, or mobile payment methods.'
        },
        {
            title: 'Online Payment',
            description: `We accept online payments through our website using credit or debit cards, mobile payment methods, and bank transfers.\n
            Your payment information is encrypted and securely processed to protect your personal and financial data.`
        },
        {
            title: 'Cash on Delivery',
            description: 'You can choose to pay for your order with cash when it is delivered to your doorstep. Please have the exact amount ready for the delivery.'
        },
        {
            title: 'Bank Transfer',
            description: 'You can transfer the payment amount directly to our bank account +94717314099 message Our whatsapp number.'
        }
        
    ];

    return (
        <div>
            <WebHeader />
            <div style={{ padding: '60px' }}>
                <h1 style={{ textAlign: 'center' }}>OUR PAYMENT METHODS</h1>
                <ul style={{ listStyleType: 'square', padding: 0 }}>
                    {services.map((service, index) => (
                        <li key={index}>
                            <h6>{service.title}</h6>
                            {/* Splitting description by newline character '\n' */}
                            <p>{service.description.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <WebFooter />
        </div>
    );
};

export default PaymentMethods;
