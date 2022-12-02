import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../assets/Logo.PNG';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <img src={HeaderLogo} alt="HeaderLogo" className='img-width' />
            <NavLink className="fs-6 fw-bold" 
            >Mobiles</NavLink>
            <NavLink className="fs-6 fw-bold" 
            >Laptops</NavLink>
            <NavLink className="fs-6 fw-bold" 
            >Speakers</NavLink>
        </div>
    )
}

export default Sidebar;

