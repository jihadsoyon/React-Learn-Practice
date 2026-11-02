import React, { useContext } from 'react';
import { InstallAppsContext } from '../../context/InstalledAppsContext';
import AppCard from '../../components/ui/AppCard';
import { toast } from 'react-toastify';

const InstallApps = () => {

    const { installedApps, setInstalledApps } = useContext(InstallAppsContext);
    console.log(installedApps, setInstalledApps);

    const handleUnInstall = (app) => {
        const NewApps = installedApps.filter(apps=> apps.id !== app.id)
        setInstalledApps([...NewApps])
        toast.success(`${app.title} is uninstalled`)

    }


    return (
        <div className='container mx-auto my-5'>
            <h2 className='text-6xl font-bold text-purple-600 my-3'>Installed Apps</h2>
            <div className=''>
                {
                    installedApps.map((app, ind) => <div key={ind}>
                        <div className='flex justify-between items-center bg-gray-300 my-4 p-5 border border-5 border-gray-500 rounded-2xl'>
                            <div>
                                <img src={app.image} alt="" className='h-[200px]' />
                                <h2 className='font-bold'>{app.title}</h2>
                            </div>
                            <div>
                                <button className='btn btn-error text-white' onClick={()=> handleUnInstall(app)}>Uninstall</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default InstallApps;