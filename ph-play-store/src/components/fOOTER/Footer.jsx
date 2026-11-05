import React from 'react';
import { Link } from 'react-router';
import logo from "../../assets/images/logo.png"

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content mt-10">
            <div className="container mx-auto px-5 py-10 grid gap-8 md:grid-cols-3">

                {/* Brand */}
                <div>
                    <img src={logo} alt="" className='h-[50px]' />
                    <p className="mt-2 text-sm opacity-80">
                        Apps jara din-er jibon-ke simple, smart ar aro moja-r kore tole.
                    </p>
                </div>

                {/* Quick links */}
                <div>
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
                        <li><Link to="/apps" className="hover:text-purple-600">Apps</Link></li>
                        <li><Link to="/installpage" className="hover:text-purple-600">Installation</Link></li>
                        <li><Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link></li>
                    </ul>
                </div>

                {/* Contact / social */}
                <div>
                    <h4 className="font-semibold mb-3">Connect</h4>
                    <p className="text-sm opacity-80">Email: hello@herojo.com</p>
                    <p className="text-sm opacity-80">Phone: +880 1XXX-XXXXXX</p>
                </div>
            </div>

            <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
                © {new Date().getFullYear()} HEROJO. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;