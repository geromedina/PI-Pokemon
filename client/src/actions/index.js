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

export function getNamePokemons(name){
    return async function(dispatch){
        try {
            const json = await axios.get("http://localhost:3001/pokemons?name=" + name)
            return dispatch( {
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        }   
        catch {
            return alert("Pokemon not found");
        }
    }
}

export function getDetail(id) {
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postPokemon(payload){
    return async function(){
        const response = await axios.post("http://localhost:3001/pokemons", payload)
        console.log(response)
        return response;
    }
}

