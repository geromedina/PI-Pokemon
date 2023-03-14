const axios = require("axios");
const { Router } = require("express");
const { Type } = require('../db');


const router = Router();

router.get('/', async (_, res, next) => {
    try {
        const api = await axios.get("https://pokeapi.co/api/v2/type"); 
        const types = await api.data // Guardo en types la respuesta que esta dentro del array data
        for (t of types.results) { // Itero cada elemento dentro del array results
            const find = await Type.findOne({ where: {name: t.name}}); // Busco en la BD si existe el tipo
            if (!find) {
                await Type.create({ name: t.name})
            } else {
                return res.json(await Type.findAll())
            }
        }
        res.json(await Type.findAll());
    } catch(error) {
        next(error)
    }
});


module.exports = router;