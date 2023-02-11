import React from "react";
import { NavLink } from "react-router-dom";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import style from './NavBar.module.css'


const NavBar = () => {

    return(
        <div className={style.container_nav}>
            <Filters />
            <div className={style.container_link}>
                <NavLink to='/create_game' className={style.create_link}>➕ Create Game</NavLink>
            </div>
            <SearchBar />
        </div>
    )
};


export default NavBar;