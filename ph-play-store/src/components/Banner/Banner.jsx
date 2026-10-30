import React from 'react';
import bannerImage from "../../assets/images/hero.png"
import { IoLogoGooglePlaystore } from "react-icons/io5";

const Banner = () => {
    return (
        <div className='min-h-[80vh text-center my-6 space-y-5'>
            <h2 className='font-bold text-6xl'>We Build<br />
                <span className='text-purple-500'>Productive</span> Apps
            </h2>
            <p className='text-gray-500 max-w-[50%] mx-auto'>At HERO.IO , we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.Our goal is to turn your ideas into digital experiences that truly make an impact. </p>
             <div className='flex justify-center gap-2'>
                <button className='btn'><IoLogoGooglePlaystore /> Play Store</button>
                <button className='btn'><IoLogoGooglePlaystore /> App Store</button>
             </div>
             <img src={bannerImage} alt="" className='mx-auto my-4'/>
        </div>
    );
};

export default Banner;