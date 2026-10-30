import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { IoCloudDownloadSharp } from "react-icons/io5";

const AppCard = ({app}) => {
    return (
        <div>
            <div className="card bg-base-100 shadow-sm">
                <figure className='bg-gray-100 p-7'>
                    <img
                        src={app.image}
                        alt={app.title}
                        className='h-[250px]' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{app.title}</h2>
                    <div className="flex justify-between ">
                        <button className="btn bg-green-200 text-green-500"><IoCloudDownloadSharp />{app.downloads}</button>
                        <button className="btn bg-amber-100 text-amber-600"><FaRegStar />{app.ratingAvg}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppCard;