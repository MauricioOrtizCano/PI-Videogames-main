import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../../redux/actions/actions";
import GameCard from "../GameCard/GameCard";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import style from './AllCards.module.css';
import Paginated from "../Paginated/Paginated";




const AllCards = () => {
    const [ page, setPage ] = useState(1);
    const byPage = 18;

    const dispatch = useDispatch();
    const { 
        videogames, 
        error, 
        listener, 
        filterUpward, 
        listenerFilter, 
        filterGenres, 
        listenerRating, 
        orderRating 
    } = useSelector(state => state);
    // const error = useSelector(state => state.error)
    // const listener = useSelector(state => state.listener)
    // const filterUpward = useSelector(state => state.filterUpward)
    // const listenerFilter = useSelector(state => state.listenerFilter)
    // const filterGenres = 


    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    },[dispatch])


    if(listenerRating) {
        const max = Math.ceil(orderRating.length / byPage)
        return (
            <div>
                <div className={style.cards_container}>
                    {orderRating.slice(
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
                </div>
                <Paginated page={page} setPage={setPage} max={max} />
            </div>                                
        )
    }
    if(listenerFilter) {
        const max = Math.ceil(filterGenres.length / byPage)
        return (
            <div>
                <div className={style.cards_container}>
                    {filterGenres.slice(
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
                </div>
                <Paginated page={page} setPage={setPage} max={max} />
            </div>                                
        )
    }

    if(listener) {
        const max = Math.ceil(filterUpward.length / byPage)
        //dispatch(getVideogames())

        return (
            <div>
                <div className={style.cards_container}>
                    {filterUpward.slice(
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
                </div>
                <Paginated page={page} setPage={setPage} max={max} />
            </div>                                
        )
    }
    
    if(videogames.length) {
        const max = Math.ceil(videogames.length / byPage)
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