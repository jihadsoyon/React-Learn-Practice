import React, { use } from 'react';


// const appsPromise = fetch('/data.json').then(res=> res.json())


const TrendingApps = () => {

    // const apps = use(appsPromise);
    // console.log(apps);

    return (
        <div>
            <div className='text-center my-5'>
                <h2 className='text-purple-500 text-4xl font-bold'>Tending Apps</h2>
                <p className=' text-gray-500 max-w-[40%] mx-auto my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus reprehenderit id, corrupti doloribus quasi magni perspiciatis distinctio, dicta ipsam, nesciunt nobis magnam blanditiis!

                </p>
            </div>
        </div>
    );
};

export default TrendingApps;