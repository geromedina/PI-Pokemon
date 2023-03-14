const { Router } = require("express");
const { getPokemonApiByName, getPokemonsDbByName, getAllPokemons, getPokemonDbById, getPokemoApiById, } = require("../controllers/getPokemon")
const { Pokemon, Type } = require("../db")

const router = Router();


router.get("/", async (req, res, next) => {
    try {

      let name = req.query.name;

      let pokemonsTotal = await getAllPokemons();
      if (name) {
        let pokemonName = await pokemonsTotal.filter((el) => 
          el.name.toLowerCase().includes(name.toLowerCase())
        );
        pokemonName.length
          ? res.status(200).send(pokemonName)
          : res.status(404).send("The entered pokemon does not exist");
      } else {
        res.status(200).send(pokemonsTotal);
      }
    } catch (error) {
      next(error);
    }
  });


router.get('/:idPokemon', async (req, res, next) => {
    try {
        const { idPokemon } = req.params;

        if (idPokemon) {
            let pokemonSearch = null;

            if (isNaN(idPokemon)){
                pokemonSearch = await getPokemonDbById(idPokemon);
            } else {
                pokemonSearch = await getPokemoApiById(idPokemon);
            }

            if(pokemonSearch) {
                return res.status(200).json(pokemonSearch);
            }
        }

        return res.status(404).json({"message": "Pokemon ID not found."})
    } catch(error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

    if (!name || !image) {
        return res.status(404).json({error : "Name and img are requerid fields."})
    }

    let pokemonSearch = await getPokemonApiByName(name);

    if (pokemonSearch.error) {
        pokemonSearch = await getPokemonsDbByName(name);
    }

    if (pokemonSearch) {
        return res.status(400).json({error : "Pokemon name already existing."})
    }

    try {
        const newPokemon = await Pokemon.create(req.body);

        if (newPokemon && types && Array.isArray(types)) {
            const promisesTypes = types.map(async (t) => {
                let type = await Type.findAll({
                    where: { name : t.name }
                })

                return newPokemon.setTypes(type); // Realiza la asocioacion como obj..
            })

            await Promise.all(promisesTypes);
        }

        let resultPokemon = await Pokemon.findAll({
            where: {
                name: name
            },
            include: [{
                model: Type,
                attributes: ['id', 'name']
            }]
        });

        return res.status(201).json(resultPokemon[0])


    } catch (error) {
        next(error);
    }
});


module.exports = router;