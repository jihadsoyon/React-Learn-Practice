import React from 'react';
import AppCard from '../ui/AppCard';
import { RingLoader } from "react-spinners";
import { Link } from 'react-router';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import useApps from '../../hooks/useApps';


// const appsPromise = fetch('/data.json').then(res=> res.json())


const TrendingApps = () => {

    // const apps = use(appsPromise);
    // console.log(apps);

    const {apps, loading} = useApps()
   
    return (
        <div className='container mx-auto my-5'>
            <div className='text-center my-5'>
                <h2 className='text-purple-500 text-4xl font-bold'>Tending Apps</h2>
                <p className=' text-gray-500 max-w-[40%] mx-auto my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit id, corrupti doloribus quasi magni perspiciatis distinctio, dicta ipsam, nesciunt nobis magnam blanditiis!</p>
            </div>
            {
                loading ? <div className='flex justify-center items-center'><RingLoader color="#ad46ff" /></div> : <div className='grid md:grid-cols-3 gap-8'>
                    {
                        apps.slice(0, 9).map(app => <AppCard key={app.id} app={app} />)
                    }
                </div>
            }
            <div className='flex justify-center my-5'>
                <Link to={"/apps"}>
                    <button className='bg-purple-600 text-white p-3 rounded cursor-pointer font-semibold flex items-center gap-1'>View All <FaArrowAltCircleRight />
</button>
                </Link>
            </div>

        </div>
    );
};

export default TrendingApps;