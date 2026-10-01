import React, { useState } from 'react';

const badgeColor = {
    popular: 'bg-red-600',
    favourite: 'bg-orange-500',
    'most wanted': 'bg-orange-500'
}

const Modalcard = ({model}) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    return (
        <div>
            <div>
                <div className="card bg-base-100 w-96 shadow-xl">

                    <figure className='relative'>
                        <img
                            src={model.image}
                            alt={model.title}
                            className='h-30' />
                        {model.status && (
                            <span className={`absolute top-3 right-3 ${badgeColor[model.status?.toLowerCase()] || 'bg-gray-500'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                {model.status}
                            </span>
                        )}
                    </figure>

                    <div className="card-body">
                        <h2 className="card-title">{model.title}</h2>
                        <p>{model.description}</p>
                        <p className='text-xl font-bold'>Price: ${model.price === 0 ? "FREE" : model.price}</p>
                        <button className="btn bg-red-600 text-white rounded-2xl" onClick={() => setIsSubscribed(true)}>{isSubscribed ? "Subscribed" : "Subscribe now"}</button>

                    </div>
                </div>
            </div>


        </div>

    );
};

export default Modalcard;