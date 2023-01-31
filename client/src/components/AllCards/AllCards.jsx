import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions/actions";
import GameCard from "../GameCard/GameCard";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import style from './AllCards.module.css';
import Paginated from "../Paginated/Paginated";



const AllCards = () => {
    const [ page, setPage ] = useState(1);
    const byPage = 18;

    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames);
    const error = useSelector(state => state.error)

    const max = Math.ceil(videogames.length / byPage)
    

    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch])

    if(videogames.length) {
        return (
            <div>
                <div className={style.cards_container}>
                    {videogames.slice(
                        (page - 1) * byPage, 
                        (page - 1) * byPage + byPage
                    ).map((vg, index) => <GameCard
                        key={index}
                        id={vg.id}
                        name={vg.name}
                        released={vg.released}
                        image={vg.image}
                        rating={vg.rating}
                        genres={vg.genres}
                        platforms={vg.platforms}
                    />)}

                                            {/* <GameCard
                                            key={videogames[99].id}
                                            id={videogames[99].id}
                                            name={videogames[99].name}
                                            released={videogames[99].released}
                                            image={videogames[99].image}
                                            rating={videogames[99].rating}
                                            genres={videogames[99].genres}
                                            platforms={videogames[99].platforms}
                                            /> */}
                </div>
                <Paginated page={page} setPage={setPage} max={max} />
            </div>                                
        )
    } 
    if (Object.keys(error).length) {
        return (
            <div>
                <h1>Has ocurred an error</h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <LoadingComponent />
            </div>
        )
    }
};


export default AllCards;