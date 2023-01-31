import axios from 'axios';

export const ERROR = 'ERROR';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const GET_GENRES = 'GET_GENRES';
export const SEARCH_VIDEOGAME = 'SEARCH_VIDEOGAME';
export const GET_ID = 'GET_ID';
//export const CLEAN_UP = 'CLEAN_UP'


export const getVideogames = (name) => {
    return async function(dispatch) {
        try {
            if(name) console.log("true")
            if(!name) {
                const response = await axios.get('http://localhost:3001/videogames');
                const videogames = response.data;
                //console.log(videogames)
                return dispatch({
                    type: GET_VIDEOGAMES,
                    payload: videogames
                })
            }
            else {
                const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
                const searchGame = response.data;
                return dispatch({
                    type: SEARCH_VIDEOGAME,
                    payload: searchGame
                })
            }
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
};


export const getVideogameDetail = (id) => {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/videogames/${id}`);
            const videogameDetail = response.data;
            return dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: videogameDetail
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error
            }) 
        }
    }
};


export const getGenres = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/genres');
            const genres = response.data;
            return dispatch({
                type: GET_GENRES,
                payload: genres
            })
        } catch (error) {
            return dispatch({
                type: ERROR,
                payload: error
            })
        }
    }
}


export const getID = (id) => {
    const idToStr = id.toString();
    getVideogameDetail(id)
    return ({
        type: GET_ID,
        payload: idToStr
    })
}



// export const searchVideogame = (name) => {
//     return async function(dispatch) {
//         try {
//             const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
//             const searchGame = response.data;
//             return dispatch({
//                 type: SEARCH_VIDEOGAME,
//                 payload: searchGame
//             })
//         } catch (error) {
//             return dispatch({
//                 type: ERROR,
//                 payload: error
//             })
//         }
//     }
// }


// export const cleanUp = () => {
//     return ({
//         type: CLEAN_UP,
//         payload: []
//     })
// }


