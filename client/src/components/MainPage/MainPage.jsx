import React from "react";
import { NavLink } from "react-router-dom";


const MainPage = () => {
 return(
    <div>
        <h1>Main Page</h1>
        <NavLink to='/home'>Start</NavLink>
    </div>
 )
};


export default MainPage;