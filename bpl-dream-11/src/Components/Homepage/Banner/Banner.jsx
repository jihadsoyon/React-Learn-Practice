import React from 'react';
import bgShadow from '../../../assets/bg-shadow.png'
import bannerNew from '../../../assets/bannerfootballogonew-removebg-preview.png'
const Banner = () => {
    return (
       
            <div
  className="hero min-h-[545px] w-[90%] md:w-[85%] lg:w-[80%] max-w-[1520px] mx-auto rounded-2xl overflow-hidden relative mb-10"
  style={{
  backgroundImage: `url(${bgShadow})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90"></div>
  <div className="hero-content text-neutral-content text-center relative z-10">
    <div className="max-w-3xl mx-auto px-4 py-12">
        <img className='mx-auto mb-6 w-40 md:w-52' src={bannerNew} alt="" />
      <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Assemble Your Ultimate Dream Trio Soccer Team</h1>
      <p className="mb-8 text-lg md:text-xl">
        Beyond Boundaries Beyond Limits
      </p>
      <button className="btn btn-primary bg-[#E7FE29] hover:bg-[#d4e022] text-black font-bold px-8 py-3 rounded-xl text-base border-none shadow-md">Claim Free Credit</button>
    </div>
  </div>
</div>
        
    );
};

export default Banner;