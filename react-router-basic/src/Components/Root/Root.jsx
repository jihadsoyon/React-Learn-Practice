import React from 'react';
import Header from '../Header/Header';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Footer/Footer';
import Sidebar from '../sidebar/Sidebar';
import './Root.css'
const Root = () => {
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location)
    return (
        <div>
            <Header></Header>
            <div className='root-main'>
                <Sidebar></Sidebar>
                {isNavigating && <span>Loading...</span>}
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;









