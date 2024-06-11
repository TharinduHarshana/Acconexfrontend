import React from 'react';
import WebHeader from '../components/WebComponent/WebHeader';
import WebFooter from '../components/WebComponent/WebFooter';
import { EnvironmentOutlined, PhoneOutlined, WhatsAppOutlined, FacebookOutlined } from '@ant-design/icons';

function WebContactUs() {
    return (
        <div>
            <WebHeader />
            <div className="container" style={{ padding: '70px', display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h1 style={{ fontFamily: 'Lucida Console', marginBottom: '20px' }}>Aconex Computers Matara</h1>
                    <p style={{ marginBottom: '20px' }}>Welcome to Aconex Computers Matara. We offer a wide range of computer services and products including sales, repair, and maintenance. Visit us at our location for more details.</p>
                    <h6 style={{ fontFamily: 'Lucida Console', marginBottom: '10px' }}>
                        <EnvironmentOutlined /> Address: Aconex Computer, 134 B535, Matara
                    </h6>
                    <h6 style={{ fontFamily: 'Lucida Console', marginBottom: '10px' }}>
                        <PhoneOutlined /> Contact Us: 0717314099
                    </h6>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <WhatsAppOutlined style={{ marginRight: '5px' }} />
                        <a href="https://wa.me/+94717314099" style={{ color: '#25D366', textDecoration: 'none', fontFamily: 'Lucida Console' }}>
                            WhatsApp
                        </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FacebookOutlined style={{ marginRight: '5px' }} />
                        <a href="https://www.facebook.com/Aconexcomputer/" style={{ color: '#4267B2', textDecoration: 'none', fontFamily: 'Lucida Console' }}>
                            Facebook
                        </a>
                    </div>
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div id="my-map-display" style={{ height: '500px', width: '100%' }}>
                        <iframe
                            style={{ height: '100%', width: '100%', border: 0 }}
                            frameBorder="0"
                            src="https://www.google.com/maps/embed/v1/place?q=ACONEX+COMPUTER+SERVICES+CENTER,+134+B535,+Matara&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <WebFooter />
        </div>
    );
}

export default WebContactUs;
