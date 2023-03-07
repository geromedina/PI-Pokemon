import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/pokemons");
        console.log(json.data)
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data,
        })
    }
};

export function getTypes(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/types");
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
};

export function filterPokemonsByType(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
};

export function filterPokemonsCreated(payload){
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
};

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
};

