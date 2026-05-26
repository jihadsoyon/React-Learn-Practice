import React from 'react';
import logoFooter from './assets/footerlogosoccer-removebg-preview.png'
const Footer = () => {
  return (
    <footer className="bg-[#0A1428] text-white pt-16 pb-8">
      {/* Newsletter Section - Gradient Card */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-[#1f2937] via-[#111827] to-[#1f2937] 
                rounded-3xl p-12 text-center shadow-2xl border border-gray-700">
          <h2 className="text-4xl font-bold text-white mb-3">
            Subscribe to our Newsletter
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
            Get the latest updates and news right in your inbox!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full sm:flex-1 bg-white text-black placeholder:text-gray-500 focus:outline-none"
            />
           <button className="btn border-0 text-white font-semibold px-12 py-6 text-base
                   bg-gradient-to-r from-[#f472b6] via-[#e879f9] to-[#fbbf24]
                   hover:from-[#ec4899] hover:via-[#d946ef] hover:to-[#f59e0b]">
  Subscribe
</button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* About Us */}
        <div>
          <div className="flex items-center gap-1 mb-4">
            <img 
              src={logoFooter}  // তোমার public ফোল্ডারে logo রাখো অথবা Figma থেকে SVG নাও
              alt="Cricket Logo" 
            />
            <h3 className="text-2xl font-bold">Soccer</h3>
          </div>
          <p className="text-gray-400 leading-relaxed">
            We are a passionate team dedicated to providing the best services to our customers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Services</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Subscribe (ছোট ভার্সন) */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Subscribe</h4>
          <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
          
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered bg-[#1A2338] border-gray-700 text-white flex-1 rounded-r-none focus:outline-none"
            />
            <button className="btn bg-gradient-to-r from-[#f472b6] via-[#e879f9] to-[#fbbf24] hover:from-[#ec4899] hover:via-[#d946ef] hover:to-[#f59e0b] border-0 rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-16 border-t border-gray-800 pt-8">
        ©2026 Your Company All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;