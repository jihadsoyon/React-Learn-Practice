import React from 'react';
import Pricingfeature from './Pricingfeature';

const PricingCard = ({pricing}) => {
  const {name, price, description, features} = pricing;
  return (
    <div className='flex flex-col border bg-amber-600 rounded-2xl p-4'>
      {/* card header */}
      <div>
        <h1 className="text-7xl">{name}</h1>
        <h4 className="text-3xl">{price}</h4>
       
      </div>
      {/* card body */}
      <div className='bg-amber-400 p-4 rounded-2xl mt-5 flex-1'>
      <p>{description}</p>
      {
      features.map((feature, index) => <Pricingfeature 
      key={index}
      feature={feature}></Pricingfeature>)
      }
      </div>
      <button className="btn w-full mt-4">Subscribe</button>
    </div>
  );
};

export default PricingCard;