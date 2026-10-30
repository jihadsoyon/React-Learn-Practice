import React, { use, useEffect, useState } from 'react';
import AppCard from '../ui/AppCard';


// const appsPromise = fetch('/data.json').then(res=> res.json())


const TrendingApps = () => {

    // const apps = use(appsPromise);
    // console.log(apps);

    const [apps, setApps] = useState([])

    useEffect(() => {
        const fetchApps = async () => {
            const res = await fetch('/data.json')
            const apps = await res.json()
            // console.log(apps);
            setApps(apps)
        }
        fetchApps()

    }, [])

    return (
        <div className='container mx-auto my-5'>
            <div className='text-center my-5'>
                <h2 className='text-purple-500 text-4xl font-bold'>Tending Apps</h2>
                <p className=' text-gray-500 max-w-[40%] mx-auto my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit id, corrupti doloribus quasi magni perspiciatis distinctio, dicta ipsam, nesciunt nobis magnam blanditiis!</p>
            </div>
            <div className='grid md:grid-cols-3 gap-8'>
                {
                    apps.map(app => <AppCard key={app.id} app={app} />)
                }
            </div>
        </div>
    );
};

export default TrendingApps;