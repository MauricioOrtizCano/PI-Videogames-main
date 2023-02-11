import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortGamesByName, filterByGenres, orderByRating } from "../../redux/actions/actions";
import style from './Filters.module.css'


const Filters = () => {
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.videogames)
    const genres = useSelector(state => state.genres)

    console.log(videogames)

    const handleClickSort = (e) => {
        e.preventDefault()
        if(e.target.value === 'A-Z') {
            const orderAZ = videogames.sort((vg1, vg2) => {
                if(vg1.name.toLowerCase() < vg2.name.toLowerCase()) return -1
                else if(vg1.name.toLowerCase() > vg2.name.toLowerCase()) return 1
                else return 0
            })
            dispatch(sortGamesByName(orderAZ))
        }
        if(e.target.value === 'Z-A') {
            const orderZA = videogames.sort((vg1, vg2) => {
                if(vg1.name.toLowerCase() > vg2.name.toLowerCase()) return -1
                else if(vg1.name.toLowerCase() < vg2.name.toLowerCase()) return 1
                else return 0
            }) 
            dispatch(sortGamesByName(orderZA))
        }
    }

    const handleClickFilter = (e) => {
        const filteredByGenre = videogames.filter(vg => vg.genres.includes(e.target.value))
        dispatch(filterByGenres(filteredByGenre))
    }

    const handlerClickRating = (e) => {
        if(e.target.value === 'Minor to Mayor') {
            const orderUpward = videogames.sort((vg1, vg2) => {
                return vg1.rating - vg2.rating
            })
            dispatch(orderByRating(orderUpward))
        }
        if(e.target.value === 'Z-A') {
            const orderFalling = videogames.sort((vg1, vg2) => {
                return vg2.rating - vg1.rating
            })
            dispatch(orderByRating(orderFalling))
        }
    }

    return(
        <div>
            <div>
                <select onClick={e => handleClickSort(e)} className={style.options}>
                    <option>Ordering By Name</option>
                    <option value='A-Z'>Upward A-Z</option>
                    <option value='Z-A'>Falling Z-A</option>
                </select>
            </div>

            <div>
                <select onClick={e => handleClickFilter(e)} className={style.options}>
                    <option>Filter By Genre</option>
                    {genres.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                </select>
            </div>

            <div>
                <select onClick={e => handlerClickRating(e)} className={style.options}>
                    <option>Ordering By Rating</option>
                    <option value='Minor to Mayor'>Minor to Mayor</option>
                    <option value='Mayor to Minor'>Mayor to Minor</option>
                </select>
            </div>
        </div>
    )
}



export default Filters;