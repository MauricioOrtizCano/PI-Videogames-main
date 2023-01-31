import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getGenres } from "../../redux/actions/actions";
import axios from "axios";


const CreateGame = () => {
    const dispatch = useDispatch()

    const allGenres = useSelector(state => state.genres)

    const [ inputs, setInputs] = useState({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: "",
        genres: [],
        platforms: []
    })
    //const [ swiched, setSwiched ] = useState(true)
    const [ errors, setErrors] = useState({})


    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    useEffect(() => {
        setErrors(validateInputs(inputs))
    }, [inputs])

    //console.log(allGenres)

    let allPlatforms = ["Xbox", "Xbox 360", "Xbox Series S/X", "Xbox One", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "Nintendo 3DS", "Wii U", "Nintendo Switch", "Linux", "PC", "macOS", "iOS", "PS Vita", "Android", "Web", "Dreamcast"]


    const validateInputs = (input) => {
        let error = {}
        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

        if(!input.name) {
            error.name = "The field name is required."
        }
        if(input.name.length > 255) {
            error.name = "The videogame must have a maximum of 255 characters in its name."
        }
        if(!input.description) {
            error.description = "The field description is required."
        }
        if(!input.image) {
            error.image = "The image field is required, should be a \"http link\"."
        }
        if(!regex.test(input.image)) {
            error.image = "The URL that you are typing is invalid, it must be an image URL."
        }
        if(!input.rating) {
            error.rating = "You should rate your videogame"
        }
        if(Number(input.rating) < 0 || Number(input.rating) > 5) {
            error.rating = "The rating field must be a value between 0.0 and 5.0."
        }
        if(input.genres.length === 0) {
            error.genres = "Your videogame must have at least one genre."
        }
        if(!input.platforms.length) {
            error.platforms = "You should select at least one platform."
        }

        return error
        
    }


    const handleInputs = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        setErrors(validateInputs(inputs))
    }


    const handleChecksGenres = (e) => {
        console.log(e)
        if(e.target.checked) {
            setInputs({
                ...inputs,
                genres: [...inputs.genres, e.target.value]
            })
            setErrors(validateInputs(inputs))    
        }
        else {
            setInputs({
                ...inputs,
                genres: inputs.genres.filter(g => g !== e.target.value)
            })
            setErrors(validateInputs(inputs))
        }
    }


    const handleChecksPlatforms = (e) => {
        if(e.target.checked) {
            setInputs({
                ...inputs,
                platforms: [...inputs.platforms, e.target.value]
            })
            setErrors(validateInputs(inputs))    
        }
        else {
            setInputs({
                ...inputs,
                platforms: inputs.platforms.filter(pt => pt !== e.target.value)
            })
            setErrors(validateInputs(inputs))
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if(Object.keys(errors).length) alert("There are unfilled fields")

    //     dispatch(createVideogame(inputs))

    //     setInputs({
    //         name: "",
    //         description: "",
    //         image: "",
    //         released: "",
    //         rating: "",
    //         genres: [],
    //         platforms: []
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(errors).length) alert("There are unfilled fields")
        if(!inputs.released){
            inputs.released = Date.now()
        }

        axios.post('http://localhost:3001/videogames', inputs)
        //dispatch(createVideogame(inputs))

        setInputs({
            name: "",
            description: "",
            released: "",
            image: "",
            rating: "",
            genres: [],
            platforms: []
        })
    }

    return(
        <div>
            <NavLink to='/home'>Home</NavLink>
            <h1>Create Game</h1>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input
                type="text" 
                name="name"
                value={inputs.name}
                onChange={handleInputs}
                />
                {errors.name ? <div>{errors.name}</div> : null}

                <label>Description: </label>
                <input 
                type="text" 
                name="description"
                value={inputs.description}
                onChange={handleInputs} 
                />
                {errors.description ? <div>{errors.description}</div> : null}

                <label>Image: </label>
                <input 
                type="text" 
                name="image"
                value={inputs.image}
                onChange={handleInputs} 
                />
                {errors.image ? <div>{errors.image}</div> : null}

                <label>Released Date: </label>
                <input 
                type="date" 
                name="released"
                value={inputs.released}
                onChange={handleInputs} 
                />
                <br></br>

                <label>Rating: </label>
                <input 
                type="text" 
                name="rating"
                value={inputs.rating}
                onChange={handleInputs} 
                />
                {errors.rating ? <div>{errors.rating}</div> : null}

                <label>Genres: </label>
                <div>
                   {allGenres.map((g, index) => {
                    return <div key={index}>
                        <label>{g.name}</label>
                        <input 
                            key={g.id} 
                            type="checkbox"
                            value={g.id}
                            name='genres'
                            onClick={e => handleChecksGenres(e)}
                        />
                    </div>
                   })} 
                </div>
                {errors.genres ? <div>{errors.genres}</div> : null}

                <label>Platforms: </label>
                <div>
                   {allPlatforms.map((pt, index) => {
                    return <div key={index}>
                        <label>{pt}</label>
                        <input
                            key={index} 
                            type="checkbox"
                            value={pt}
                            name="platforms"
                            onClick={e => handleChecksPlatforms(e)}
                        />
                    </div>
                   })}
                </div>

                <button type="submit">Create Videogame</button>
            </form>
        </div>
    )
};


export default CreateGame;