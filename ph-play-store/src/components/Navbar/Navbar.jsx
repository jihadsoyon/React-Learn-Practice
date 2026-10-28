import React from 'react';
import logoImg from "../../assets/images/logo.png"

const Navbar = () => {
    return (
        <nav className='shadow'>
            <div className='flex justify-between items-center bg-white py-3 w-11/12 mx-auto'>
            <img src={logoImg} alt="" className='w-[50px]'/>
            <ul className='flex justify-between items-center gap-4'>
                <li>Home</li>
                <li>Apps</li>
                <li>Installation</li>
            </ul>
            <button className='btn'>Contribute</button>
            </div>
        </nav>
    );
};

export default Navbar;