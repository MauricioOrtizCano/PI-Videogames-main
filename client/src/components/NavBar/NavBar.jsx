import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";


const NavBar = () => {
    

    return(
        <div>
            <NavLink to='/create_game'>Create Game</NavLink>
            <SearchBar />
        </div>
    )
};


export default NavBar;