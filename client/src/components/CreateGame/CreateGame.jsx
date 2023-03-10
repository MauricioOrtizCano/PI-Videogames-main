import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getGenres } from "../../redux/actions/actions";
import axios from "axios";
import style from './CreateGame.module.css';
import screen from './FondoHome.png'


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


        alert('The Game has been created successfully')
    }

    return(
        <div className={style.mayor}>
            <img src={screen} alt='fondo' className={style.fondo}/>
            <div className={style.container_creategame}>
                
                <h1>Create Game</h1>
                <form onSubmit={handleSubmit} className={style.form_create}>
                    <div className={style.label_container}>
                        <label className={style.names}>Name: </label>
                        <input
                        className={style.inputs_names}
                        type="text" 
                        name="name"
                        value={inputs.name}
                        onChange={handleInputs}
                        />
                        {errors.name ? <div className={style.errors}>{errors.name}</div> : null}
                    </div>

                    <div className={style.label_container}>
                        <label className={style.names}>Description: </label>
                        <input
                        className={style.inputs_description} 
                        type="text" 
                        name="description"
                        value={inputs.description}
                        onChange={handleInputs} 
                        />
                        {errors.description ? <div className={style.errors}>{errors.description}</div> : null}
                    </div>

                    <div className={style.label_container}>
                        <label className={style.names}>Image: </label>
                        <input
                        className={style.inputs_names}
                        type="text" 
                        name="image"
                        value={inputs.image}
                        onChange={handleInputs} 
                        />
                        {errors.image ? <div className={style.errors}>{errors.image}</div> : null}
                    </div>

                    <div className={style.label_container}>
                        <label className={style.names}>Released Date: </label>
                        <input
                        className={style.inputs_names}
                        type="date" 
                        name="released"
                        value={inputs.released}
                        onChange={handleInputs} 
                        />
                    </div>

                    <div className={style.label_container}>
                        <label className={style.names}>Rating: </label>
                        <input
                        className={style.inputs_names}
                        type="text" 
                        name="rating"
                        value={inputs.rating}
                        onChange={handleInputs} 
                        />
                        {errors.rating ? <div className={style.errors}>{errors.rating}</div> : null}
                    </div>

                    <div className={style.label_container}>
                        <label className={style.names}>Genres: </label>
                        <div className={style.container_arrays}>
                        {allGenres.map((g, index) => {
                            return <div key={index}>
                                <label>{g.name} </label>
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
                        {errors.genres ? <div className={style.errors}>{errors.genres}</div> : null}
                    </div>
                    
                    <div className={style.label_container}>
                        <label className={style.names}>Platforms: </label>
                        <div className={style.container_arrays}>
                        {allPlatforms.map((pt, index) => {
                            return <div key={index}>
                                <label>{pt} </label>
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
                        {errors.platforms ? <div className={style.errors}>{errors.platforms}</div> : null}
                    </div>

                    <button type="submit" className={style.button}>Create Videogame</button>
                </form>
                <div className={style.back_tohome}>
                    <NavLink to='/home' className={style.link}>???? Home</NavLink>
                </div>
            </div>    
        </div>
    )
};


export default CreateGame;