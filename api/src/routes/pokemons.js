const { Router } = require("express");
const getAllPokemons = require('../controllers/getPokemon')
const { Pokemon, Type } = require('../db')

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let name = req.query.name
        const pokemonsTotal = await getAllPokemons();

        if (name) {
            const pokemonName = await pokemonsTotal.filter((p) => 
            p.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length
                ? res.status(200).send(pokemonName)
                : res.status(404).send("The entered pokemon doesn't exist.")
        } else res.status(200).send(pokemonsTotal);
    } catch (error) {
        next(error)
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const pokemonsTotal = await getAllPokemons();
        if (id) {
            const pokemonId = pokemonsTotal.filter((p) => p.id === id);
            pokemonId.length
                ? res.status(200).json(pokemonId)
                : res.status(404).send("Pokemon not found.")
        }
    } catch (error) {
        next(error)
    }
});


router.post('/', async (req,res,next) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
        const newPokemon = await Pokemon.create({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
        });

        if (!name) return res.json({ info : "Name is required."})

        if (Array.isArray(types) && types.length) {
            const dbTypes = await Promise.all(
                types.map((t) => {
                    return Type.findOne({where: { name: t}})
                })
            )
            await newPokemon.setTypes(dbTypes)
            return res.send("Pokemon successfully created.")
        }
    } catch (error) {
        res.status(400).send("Data error.")
    }
})

module.exports = router;