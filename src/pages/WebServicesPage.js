import React from 'react';
import WebHeader from '../components/WebComponent/WebHeader';
import WebFooter from '../components/WebComponent/WebFooter';

const Services = () => {
    const services = [
        {
            title: 'CCTV Selling',
            description: 'We offer a range of high-quality CCTV cameras for sale to meet your security needs.'
        },
        {
            title: 'CCTV Repair and Installation',
            description: 'Our expert technicians provide professional repair and installation services for CCTV systems.'
        },
        {
            title: 'Desktop Computer Selling',
            description: 'Explore our selection of desktop computers, featuring the latest technology and performance.'
        },
        {
            title: 'Desktop Computer Repairing',
            description: 'Get your desktop computer repaired by our experienced technicians for optimal performance.'
        },
        {
            title: 'Laptop Selling',
            description: 'Discover our wide range of laptops, from budget-friendly options to high-performance models.'
        },
        {
            title: 'Laptop Repair',
            description: 'Trust our skilled technicians to diagnose and repair any issues with your laptop.'
        },
        {
            title: 'Printers and Parts Selling',
            description: 'We offer a variety of printers and printer parts to keep your office running smoothly.'
        },
        {
            title: 'Printer Repairing',
            description: 'Our technicians are trained to fix printer issues quickly and efficiently to minimize downtime.'
        },
        {
            title: 'Computer Accessories Selling',
            description: 'Find the computer accessories you need, from keyboards and mice to cables and adapters.'
        },
        {
            title: 'Computer Accessories Repairing',
            description: 'We repair a wide range of computer accessories to keep your devices working properly.'
        },
        {
            title: 'Network Solutions',
            description: 'We provide comprehensive network solutions to help you set up and maintain a secure network.'
        },
        {
            title: 'Security and Access Control Solutions',
            description: 'Enhance your security with our access control solutions, including biometric systems and keypads.'
        },
        {
            title: 'Warranty Conditions',
            description: `1. Warranty is only applicable under the ‘Warranty Terms and conditions’ of the Supplier.\n
            2. Warranty is only applicable during the time period mentioned in the Invoice. Date of the Invoice will be the Date of Purchase.\n
            3. Warranty is not applicable to the items with corrosions, burn marks or any physical damage.\n
            4. Warranty is only applicable to the extent of the proof of purchase produced. If no such proof exists, warranty cannot be claimed.\n
            5. Warranty covers only the manufacture defects. Damages or defects due to other causes, such as negligence, misuse, improper operation, power fluctuation, lightning or other natural disasters, sabotage, or accident, etc., are not covered by the warranty.\n
            6. Warranty does not apply for software or data lost during repair or replacement.\n
            7. Laptop batteries and chargers carry only a 1-year warranty.\n
            8. 01M = 1 Month / 03M = 3 months / 06M += 180 Days / 01Y = 350 Days / 02Y = 700 Days / 03Y = 1050 Days / 05Y = 1750 Days / NW = No warranty.`
        }
    ];

    return (
        <div>
            <WebHeader />
            <div style={{ padding: '60px' }}>
                <h1 style={{ textAlign: 'center' }}>OUR SERVICES</h1>
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

export default Services;
