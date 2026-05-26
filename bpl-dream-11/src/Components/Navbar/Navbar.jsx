import React from 'react';
import dollerImg from '../../assets/dollar_1.png'
import newLogo from '../../assets/messilogonew.png'

const Navbar = ({coin}) => {
    return (
        <div className='mb-5 '>
                <div className="navbar bg-[#ffffff] text-black  px-4 md:px-8 py-3">

        {/* Logo - Left Side */}
        <div className="navbar-start">
          <a href="#" className="flex items-center">
            <img 
              src={newLogo} 
              alt="Cricket Logo" 
              className="h-10 md:h-12 w-auto" 
            />
          </a>
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden md:flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-[#6d7052]">Home</a>
          <a href="#" className="hover:text-[#6d7052]">Fixture</a>
          <a href="#" className="hover:text-[#6d7052]">Teams</a>
          <a href="#" className="hover:text-[#6d7052]">Schedules</a>
        </div>

        {/* Coins - Right Side */}
        <div className="navbar-end">
          <button className="flex items-center gap-2 bg-[#ffffff] hover:bg-[#c5c5c5] shadow-sm px-5 py-2 rounded-xl font-bold text-base">
            {coin}coins
            <img 
              src={dollerImg} 
              alt="coin" 
              className="w-6 h-6" 
            />
          </button>
        </div>
      </div>
        </div>
    );
};

export default Navbar;