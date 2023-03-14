const initialState = {
    pokemons : [],
    allPokemons: [],
    types : [],
    detail: [],
    filters: [],
}



function rootReducer (state = initialState, action) {


    switch(action.type) {
        case 'GET_POKEMONS':{
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        }
        case "GET_TYPES": {
            return {
                ...state,
                types: action.payload,
            }
        }
        case "FILTER_BY_TYPE": {
            const allPokemons = state.allPokemons;
            const typesFiltered = action.payload === "all"
                ? allPokemons 
                : allPokemons.filter((el) => el.types.includes(action.payload));
            return {
                ...state,
                pokemons: typesFiltered,
                filters: typesFiltered,
            } 
        }
        case "FILTER_BY_CREATED": {
            const allPokemons = state.allPokemons
            const createdFilter = action.payload === "created"
            ? allPokemons.filter((el) => el.createdInDb)
            : allPokemons.filter((el) => !el.createdInDb)
            return {
                ...state,
                pokemons: action.payload === "all" 
                ? state.allPokemons
                : createdFilter
            }
        }
        case "ORDER_BY_NAME": {
            let sortedArr = action.payload === "asc" ?
            state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: sortedArr
            }
        }
        case "POST_POKEMON":{
            return {
              ...state,
            };
        }
        case "GET_NAME_POKEMONS": {
            return {
                ...state,
                pokemons: action.payload
            }
        }
        case "GET_DETAILS": {
            return {
                ...state,
                detail: action.payload
            }
        }
        default : return state;
    }
}

export default rootReducer;