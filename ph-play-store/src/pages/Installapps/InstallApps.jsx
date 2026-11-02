import React, { useContext } from 'react';
import { InstallAppsContext } from '../../context/InstalledAppsContext';
import AppCard from '../../components/ui/AppCard';

const InstallApps = () => {

    const { installedApps, setInstalledApps } = useContext(InstallAppsContext);
    console.log(installedApps, setInstalledApps);

    return (
        <div className='container mx-auto my-5'>
            <h2>Installed Apps</h2>
            <div className='grid grid-cols-3 gap-3'>
                {
                    installedApps.map(app => <AppCard app={app} />)
                }
            </div>
        </div>
    );
};

export default InstallApps;