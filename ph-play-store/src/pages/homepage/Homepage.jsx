import React from 'react';
import Banner from '../../components/Banner/Banner';
import Stats from '../../components/Stats/Stats';
import TrendingApps from '../../components/TrendingApps/TrendingApps';

const Homepage = () => {
    return (
        <div>
            <Banner />
            <Stats />
            <TrendingApps />
        </div>
    );
};

export default Homepage;