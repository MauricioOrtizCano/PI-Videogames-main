import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions/actions";


const SearchBar = () => {
    const dispatch = useDispatch();
    // const errors = useSelector(state => state.error);

    const [ game, setGame ] = useState("")

    //console.log(game)

    const handleSubmit = (e) => {
        //console.log(e)
        e.preventDefault();
        dispatch(getVideogames(game));
        setGame("")
    }




    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input 
                    type="text"
                    placeholder="Search for a Videogame..."
                    value={game}
                    onChange={e => {
                        console.log(e.target.value)
                        return setGame(e.target.value)}}
                />
                <input 
                    type="submit"
                    value="Search"
                />
            </form>
        </div>
    )
};


export default SearchBar;