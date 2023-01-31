import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";



const DetailVideogame = () => {

    const gameDetail = useSelector(state => state.videogameDetail)
    const errors = useSelector(state => state.error);
    const id = useSelector(state => state.getId)
    console.log(id)
    console.log(gameDetail)

    //const transformDescription = gameDetail.description

    
    if (Object.keys(errors).length) {
        return (
            <div>
                <h1>Has ocurred an error</h1>
            </div>
        )
    }
    return(
        <div>
            <div>
                <div>
                    <h1>{gameDetail.name}</h1>
                    <h3>Released: {gameDetail.released}</h3>
                    <div>Platforms: {gameDetail.platforms?.map((p, index) => <p key={index}>{p}</p>)}</div>
                    <div>{gameDetail.rating}</div>
                </div>
                <h3>Description:</h3>
                <p>{gameDetail.description}</p>
                <div>Genres: {gameDetail.genres?.map((g, index) => <p key={index}>{g}</p>)}</div>
            </div>
            <div>
                <NavLink to='/home'>Home</NavLink>
            </div>
        </div>
    )
};


export default DetailVideogame;