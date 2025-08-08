// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                    <p>Email: support@freelancetask.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Freelancer St, Remote City, World</p>
                </div>

                {/* Terms and Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/faq" className="hover:underline">FAQs</a></li>
                        <li><a href="/support" className="hover:underline">Support</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400"><FaTwitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
                &copy; {new Date().getFullYear()} Freelance Task Marketplace. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
