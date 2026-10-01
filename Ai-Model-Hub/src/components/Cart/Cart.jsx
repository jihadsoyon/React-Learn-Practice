import React from 'react';
import logo from "../../assets/logo.png"
const Cart = ({ selectedCart, setSelectCart }) => {
    console.log(selectedCart);

    const handleDeleteBTN = (newCart) => {
        setSelectCart(selectedCart.filter(cart => cart.title != newCart.title))

    }

    return (
        <div>
            {
                selectedCart.length === 0 ? (<div className='container mx-auto bg-base-200 border border-black p-4 rounded-2xl my-5'>
                    <img src={logo} alt="" className='h-30 mx-auto text-center'/>
                    <h1 className='text-2xl font-bold flex justify-center items-center text-center'>Cart Will be added very soon</h1>
                </div>) : (
                    selectedCart.map(newCart => {
                        return <div key={newCart.id}>
                            <div className='container mx-auto flex justify-between items-center bg-base-300 border border-red-300 p-6 rounded-2xl my-4'>
                                <div className='flex items-center gap-4'>
                                    <img src={newCart.image} alt="" className='h-40' />
                                    <div>
                                        <h2 className='text-xl font-bold'>{newCart.title}</h2>
                                        <p className='text-gray-500'>{newCart.description}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <p className='font-bold'>{newCart.price}
                                        <br />  per month
                                    </p>
                                    <button className='btn' onClick={() => handleDeleteBTN(newCart)}>❌</button>
                                </div>
                            </div>
                        </div>
                    })
                )
            }
        </div>
    );
};

export default Cart;



// {
//     "id": 2,
//     "title": "Grok",
//     "description": "Built by xAI with real-time knowledge from X.\nHelpful, witty, and maximally truth-seeking AI.",
//     "price": 30,
//     "image": "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/grok-icon.png",
//     "status": "favourite"
// }