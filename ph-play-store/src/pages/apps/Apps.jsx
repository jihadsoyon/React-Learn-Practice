import React from 'react';
import useApps from '../../hooks/useApps';
import { RingLoader } from 'react-spinners';
import AppCard from '../../components/ui/AppCard';

const Apps = () => {
    const { apps, loading } = useApps();
    console.log(apps, loading);
    return (
        <div className='container mx-auto my-5'>
            <h2 className='font-bold text-4xl my-4 text-purple-500'>All Apps</h2>
            {
                loading ? <div className='flex justify-center items-center'><RingLoader color="#ad46ff" /></div> : <div className='grid md:grid-cols-3 gap-8'>
                    {
                        apps.map(app => <AppCard key={app.id} app={app} />)
                    }
                </div>
            }
        </div>
    );
};

export default Apps;