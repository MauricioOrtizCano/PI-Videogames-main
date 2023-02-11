import { ERROR, GET_VIDEOGAMES, GET_VIDEOGAME_DETAIL, GET_GENRES, SEARCH_VIDEOGAME, GET_ID, SORT_GAMES_BY_NAME, FILTER_BY_GENRES, ORDER_BY_RATING } from "../actions/actions";

const initialState = {
    videogames: [],
    videogameDetail: {},
    error: {},
    filterUpward: [],
    filterGenres: [],
    orderRating: [],
    genres: [],
    getId: "",
    listener: false,
    listenerFilter: false,
    listenerRating: false
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
                videogames: payload,
                filterUpward: payload,
                filterGenres: payload
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

        case SORT_GAMES_BY_NAME:
            return({
                ...state,
                filterUpward: payload,
                listener: true
            })
            
        case FILTER_BY_GENRES:
            return({
                ...state,
                filterGenres: payload,
                listenerFilter: true
            })

        case ORDER_BY_RATING:
            return({
                ...state,
                orderRating: payload,
                listenerRating: true
            })

        default:
            return ({...state})
    }
}