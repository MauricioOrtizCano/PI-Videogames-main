import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import style from './DetailVideogame.module.css'



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
        <div className={style.mayor}>
            <img src={gameDetail.image} alt='imagen' className={style.image} />
            <div className={style.container_creategame}>
                <div className={style.main_data}>
                    <div>
                        <h1>{gameDetail.name}</h1>
                        <h3>Released: {gameDetail.released}</h3>
                        <div>
                            <b>Platforms:</b> 
                            <b>{gameDetail.platforms?.map((p, index) => <p key={index}>{p}</p>)}</b>
                        </div>
                    </div>
                    <div className={style.rating_container}><p className={style.rating}>{gameDetail.rating}🟊</p></div>
                </div>
                <h3>Description:</h3>
                <p>{gameDetail.description}</p>
                <div className={style.mapeo}><b>Genres: </b>{gameDetail.genres?.map((g, index) => <p key={index}>{g}</p>)}</div>
                <div className={style.back_tohome}>
                    <NavLink to='/home' className={style.link}>🏠 Home</NavLink>
                </div>
            </div>

        </div>
    )
};


export default DetailVideogame;