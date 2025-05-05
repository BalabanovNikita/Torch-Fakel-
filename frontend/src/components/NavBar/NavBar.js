import React, {useEffect, useState} from 'react';
import {Link as NavLink, useLocation} from "react-router-dom";
import {routes} from "../routes";
import {Button} from "@mui/material";
import {Hexagon} from 'lucide-react';

import "./NavBar.css"

const NavBar = () => {
    const location = useLocation();
    const [active, setActive] = useState(() => {
        const storedIndex = localStorage.getItem('activeNavItem');
        return storedIndex ? parseInt(storedIndex, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('activeNavItem', active.toString());
    }, [active]);

    useEffect(() => {
        const currentRouteIndex = routes.findIndex(route => location.pathname === route.path);
        if (currentRouteIndex !== -1) {
            setActive(currentRouteIndex);
        }
    }, [location.pathname, routes]);

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <Hexagon size={40} className="nav-buttons"/>
            </div>
            {routes.map((route, index) => (
                <NavLink to={route.path} key={index}>
                    <Button onClick={() => setActive(index)}
                            className={active === index ? "active" : ""}>
                        {<route.icon size={40} className="nav-buttons"/>}
                    </Button>
                </NavLink>
            ))}
        </div>
    );
};

export default NavBar;