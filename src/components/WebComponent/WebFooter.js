import React from 'react';
import { FacebookOutlined, WhatsAppOutlined } from '@ant-design/icons';

function WebFooter() {
    return (
        <footer className="bg-dark text-white py-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <p className="mb-0">ACCONEX COMPUTER, ANAGARIKA DHARMAPALA ROAD MATARA</p>
                        <p className="mb-0">CONTACT US: 0778570388</p>
                    </div>
                    <div className="col-md-6 text-md-right">
                        <p className="mb-0">FOLLOW US:
                            <a className="text-white mx-2" href="https://www.facebook.com/Aconexcomputer/"><FacebookOutlined /></a>
                            <a className="text-white mx-2" href="https://wa.me/+94717314099"><WhatsAppOutlined /></a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center py-1">
                <small>&copy; 2024 Your Auction Site. All Rights Reserved.</small>
            </div>
        </footer>
    );
}

export default WebFooter;
