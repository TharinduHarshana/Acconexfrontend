import React from 'react';
import { FacebookOutlined, WhatsAppOutlined } from '@ant-design/icons';

function WebFooter() {
    return (
        <footer className="bg-dark text-white py-2">
            <div className="container">
                <div className="row mb-2">
                    <div className="col-md-12">
                        <div id="my-map-display" style={{ height: '200px', width: '100%' }}>
                            <iframe
                                style={{ height: '100%', width: '100%', border: 0 }}
                                frameBorder="0"
                                src="https://www.google.com/maps/embed/v1/place?q=ACONEX+COMPUTER+SERVICES+CENTER,+134+B535,+Matara&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <p className="mb-1">ACCONEX COMPUTER, ANAGARIKA DHARMAPALA ROAD MATARA</p>
                        <p className="mb-1">CONTACT US: 0717314099</p>
                    </div>
                    <div className="col-md-6 text-md-right">
                        <p className="mb-1">FOLLOW US:
                            <a className="text-white mx-2" href="https://www.facebook.com/Aconexcomputer/"><FacebookOutlined /></a>
                            <a className="text-white mx-2" href="https://wa.me/+94717314099"><WhatsAppOutlined /></a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center py-1">
                <small>&copy; 2024 Your E-Commerce Site. All Rights Reserved.</small>
            </div>
        </footer>
    );
}

export default WebFooter;
