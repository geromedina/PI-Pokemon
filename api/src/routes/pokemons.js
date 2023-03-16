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


router.post('/', async(req, res) => {
    try {
        let { name, image, hp, attack, defense, speed, height, weight, types } = req.body 

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

        if (!name || !image) return res.json({info: 'The name and image are required'});

        if(Array.isArray(types) && types.length) {
            let dbTypes = await Promise.all(
                types.map((e) => {
                    return Type.findOne({where: {name: e}})
                })
            )
            
            await newPokemon.setTypes(dbTypes)

            return res.send("Pokemon successfully created")
        } 
    } catch(error) {
        res.status(400).send("Data error.")
    }
})


module.exports = router;