import React, { use, useState } from 'react';
import Models from '../Models/Models';
import Cart from '../Cart/cart';

const AllModelCart = ({modelPromise}) => {
    const models = use(modelPromise)
    // console.log(models); 

    const [selectedType, setSelectedType] = useState("models")

    return (
        <div>
            <hr className='text-gray-100' />
            <div className='flex justify-center items-center gap-4 my-8'>
                <button onClick={()=> setSelectedType('models')} className={`${selectedType === 'models' ? "bg-[#ff3b6b] hover:bg-[#e02e5a] text-white font-medium px-35 py-3 rounded-2xl transition-all duration-300" : "text-black bg-white font-medium px-35 py-3 rounded-2xl transition-all duration-300"} `}>
                    Models
                </button>

                <button onClick={()=> setSelectedType('cart')} className={`${selectedType === 'cart' ? "bg-[#ff3b6b] hover:bg-[#e02e5a] text-white font-medium px-35 py-3 rounded-2xl transition-all duration-300" : "text-black bg-white font-medium px-35 py-3 rounded-2xl transition-all duration-300"} `}>
                    Cart(0)
                </button>
            </div>

            {selectedType === "models" ? <Models models={models}></Models> : <Cart></Cart>}
        </div>
    );
};

export default AllModelCart;    

