const axios = require("axios");
const { Pokemon, Type } = require("../db")

// GET a la API EXTERNA
const getApiInfo = async () => {
    const resp = await axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=40")
        .then((data) => {
            return data.data.results;
        })
        .then((data) => {
            return Promise.all(data.map((res) => axios.get(res.url)));
        })
        .then((data) => {
            return data.map((res) => res.data)
        })
        // Resultado final de cada pokemon se guarda en resp
    
    let arrayPoke = resp.map((p) => {
        return {
            id: p.id,
            name: p.name,
            types: p.types.map((t) => t.type.name),
            image: p.sprites.front_default,
            hp: p.stats[0].base_stat,
            attack: p.stats[1].base_stat,
            defense: p.stats[2].base_stat,
            speed: p.stats[3].base_stat,
            height: p.height,
            weight: p.weight,
        }
    })
    return arrayPoke;
}

// GET a la BDD
const getDbInfo = async () => {
    try {
        const results = await Pokemon.findAll({
            include: Type,
            attributes: ["name"],
            through:{
                attributes: [],
            }
        })
        return results
    }   catch (error) {
        console.log(error)
    }
}

// Junto los resultados
const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getApiInfo();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo;
}

module.exports = getAllPokemons;