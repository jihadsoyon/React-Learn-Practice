import React from 'react';
import logoImg from "../../assets/images/logo.png"
import { FaGithub } from "react-icons/fa";
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <nav className='shadow'>
            <div className='flex justify-between items-center bg-white py-3 w-11/12 mx-auto'>
            <img src={logoImg} alt="" className='w-[50px]'/>
            <ul className='flex justify-between items-center gap-4'>
                <li><NavLink className={({isActive})=> `font-semibold mr-1  ${isActive ? "text-purple-500 underline underline-offset-8" : ""}`} to={"/"}>Home</NavLink></li>
                <li><NavLink className={({isActive})=> `font-semibold mr-1  ${isActive ? "text-purple-500 underline underline-offset-8" : ""}`} to={"/apps"}>Apps</NavLink></li>
                <li><NavLink className={({isActive})=> `font-semibold mr-1  ${isActive ? "text-purple-500 underline underline-offset-8" : ""}`} to={"/installedApps"}>Installation</NavLink></li>
                <li><NavLink className={({isActive})=> `font-semibold mr-1  ${isActive ? "text-purple-500 underline underline-offset-8" : ""}`} to={"/dashboard"}>Dashboard</NavLink></li>
            </ul>
            <button className='btn bg-purple-600 text-white'><FaGithub />Contribute</button>
            </div>
        </nav>
    );
};

export default Navbar;