
import React, { useContext } from 'react';
import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Cell,
    Legend,
} from 'recharts';
import { InstallAppsContext } from '../../context/InstalledAppsContext';
import useApps from '../../hooks/useApps';



const COLORS = [
    '#61DAFB',
    '#FFA500',
    '#68A063',
    '#47A248',
];

const DashboardPage = () => {

    const { installedApps } = useContext(InstallAppsContext);
    const { apps } = useApps();
    console.log(apps);
    const uninstalledApps = apps.length - installedApps.length
    console.log(uninstalledApps, installedApps.length);


    const data = [
        { name: 'InstalledApps', value: installedApps.length },
        { name: 'UnininstalledApps', value: uninstalledApps },

    ];

    return (
        <div className='flex justify-center my-5'>
            <div className="w-full max-w-[500px] ">
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius="80%"
                            outerRadius="100%"
                            cornerRadius="50%"
                            paddingAngle={5}
                            dataKey="value"
                            isAnimationActive={true}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${entry.name}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>


    );
};

export default DashboardPage;
