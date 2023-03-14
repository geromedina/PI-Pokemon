const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Sequelize } = require('sequelize');


async function getPokemonsApi(){ 

    let arrayPokemonsApi = []

    await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50`)
        .then(async (response) => {
            let arrayResultApi = response.data.results;
            let arrayPromises = [];
            arrayResultApi.map((p) => arrayPromises.push(axios.get(p.url)));

            await Promise.all(arrayPromises)
                .then((pokemons) => {
                    arrayPokemonsApi = pokemons.map((p) => {
                        return {
                            id: p.data.id,
                            name: p.data.name,
                            image: p.data.sprites.other.dream_world.front_default,
                            hp: p.data.stats[0].base_stat,
                            attack: p.data.stats[1].base_stat,
                            defense: p.data.stats[2].base_stat,
                            speed: p.data.stats[3].base_stat,
                            height: p.data.height,
                            weight: p.data.weight,
                            types: p.data.types.map((t) => {
                                return {
                                    name: t.type.name
                                }
                            })
                        }
                    })
                })
                .catch((error) => {
                    return error;
                });
        })
        .catch((error) => {
            return error;
        })
        return arrayPokemonsApi;
};


async function getPokemonsDb() {
    try {
        const arrayPokemonsDb = await Pokemon.findAll({
            include: {
                attributes: ["name"],
                model: Type,
                through: {
                    attributes: [],
                }
            }
        });
        
        return arrayPokemonsDb;
    } catch(error) {
        return error
    }
};


async function getAllPokemons() {
    try {
        let apiPokemons = await getPokemonsApi();
        let dbPokemons = await getPokemonsDb();
        return apiPokemons.concat(dbPokemons)
    } catch(error) {
        return error;
    }
};


async function getPokemoApiById(id) {
    try {
        const searchPokemonsApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (searchPokemonsApi) {
            let p = searchPokemonsApi;

            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.other.dream_world.front_default,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[3].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((t) => { return {name: t.type.name}})
            }
        } else return null;
    } catch(error) {
        return null;
    }
};


async function getPokemonDbById(id) {
    try {
        const searchPokemon = await Pokemon.findOne({
            where: {
                id: id
            },
            include: {
                attributes: ["name"],
                model: Type,
            }
        });
        return searchPokemon;
    } catch(error) {
        return null;
    }
};


async function getPokemonApiByName(name) {
    try {
        const searchPokemonsApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (searchPokemonsApi) {

            let p = searchPokemonsApi;

            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.other.dream_world.front_default,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[3].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((t) => { return {name: t.type.name}})
            }
        } else return null;

    } catch(error) {
        return ({error: "Pokemon not found."});
    }
}


async function getPokemonsDbByName(name){
    try {
        const searchPokemon = await Pokemon.findOne({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('pokemon.name')),
                Sequelize.fn('lower', name)
            ),

            include: {
                attributes: ["name"],
                model: Type,
            }
        })

        return searchPokemon

    } catch(error) {
        return error;
    }
}


module.exports = { 
    getPokemonsApi,
    getPokemonsDb,
    getAllPokemons,
    getPokemoApiById,
    getPokemonDbById,
    getPokemonApiByName,
    getPokemonsDbByName,
}