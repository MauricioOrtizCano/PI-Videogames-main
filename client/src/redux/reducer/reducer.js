import { ERROR, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, SEARCH_VIDEOGAME, GET_ID } from "../actions/actions";

const initialState = {
    videogames: [],
    videogameDetail: {},
    error: {},
    filters: [],
    genres: [],
    getId: ""
}


export default function rootReducer (state = initialState, {type, payload}) {
    switch (type) {
        case ERROR:
            return({
                ...state,
                error: payload
            })

        case GET_VIDEOGAMES:
            return({
                ...state,
                videogames: payload
            })

        case GET_VIDEOGAME_DETAIL:
            return({
                ...state,
                videogameDetail: payload
            })

        case GET_GENRES:
            return({
                ...state,
                genres: payload
            })

        case SEARCH_VIDEOGAME:
            return({
                ...state,
                videogames: payload,
            })

        case GET_ID:
            return({
                ...state,
                getId: payload
            })

        default:
            return ({...state})
    }
}