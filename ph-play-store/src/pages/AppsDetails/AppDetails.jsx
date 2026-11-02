
import React, { useContext } from 'react';
import { useParams } from 'react-router';
import useApps from '../../hooks/useApps';
import { RingLoader } from 'react-spinners';
import { MdInstallDesktop } from "react-icons/md";
import { InstallAppsContext } from '../../context/InstalledAppsContext';

const AppDetails = () => {
    const { appID } = useParams();
    const { apps, loading } = useApps();
    const expectedApp = apps.find(app => String(app.id) === appID);

    const {installedApps, setInstalledApps} = useContext(InstallAppsContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <RingLoader color="#ad46ff" />
            </div>
        );
    }

    const handleInstallApp = ()=> {
        setInstalledApps([...installedApps, expectedApp])
    }


    return (
        <div className='container mx-auto shadow p-5 my-5 text-center'>
            <img src={expectedApp.image} alt={expectedApp.companyName} className='h-[200px] mx-auto'/>
            <h2 className="font-bold text-6xl">{expectedApp.companyName}</h2>
            <button className='btn bg-purple-600 text-white my-5 hover:bg-purple-800' onClick={()=> handleInstallApp()}>Install Now <MdInstallDesktop /></button>
        </div>
    );
};

export default AppDetails;