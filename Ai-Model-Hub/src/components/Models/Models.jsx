import React from 'react';
import Modalcard from '../ModalCard/Modalcard';

const Models = ({ models, selectedCart, setSelectCart }) => {
    return (
        <div>
            <div className='container mx-auto grid md:grid-cols-2 lg:grid-cols-3 space-y-4'>
                {
                    models.map(model => <Modalcard key={model.id} model={model} selectedCart={selectedCart} setSelectCart={setSelectCart}></Modalcard>)
                }
            </div>
        </div>
    );
};

export default Models;