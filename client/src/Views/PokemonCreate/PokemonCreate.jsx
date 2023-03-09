import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postPokemon, getTypes } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from "../../components/NavBar/NavBar"
import styles from "./PokemonCreate.module.css"


function validate(pokemon){
    let errors = {};
    if (!pokemon.name) {
        errors.name = 'Name is required.'
    } else if (!pokemon.attack) {
        errors.attack = 'Attack is required.'
    }

    return errors;
}


export default function PokemonCreate(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const types = useSelector((state) => state.types)
    const [ errors, setErrors ] = useState({});

    const [ pokemon, setPokemon ] = useState({
        name: "",
        types: [],
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
    })

    function handleChange(e) {
        e.preventDefault();
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...pokemon,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e){
        setPokemon({
            ...pokemon,
            types: [...pokemon.types, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(pokemon)
        dispatch(postPokemon(pokemon))
        alert("Pokemon successfully created!")
        setPokemon({
            name: "",
            types: [],
            image: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,    
        })
        navigate("/pokemons")
    }

    function handleDelete(el){
        setPokemon({
            ...pokemon,
            types: pokemon.types.filter( t => t !== el)
        })
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return(
        <div>
            <NavBar />
            <div className={styles.container}>
                <form className={styles.form_containter} onSubmit={handleSubmit}>
                    <h3 className={styles.form_title}>Create your pokemon!</h3>

                    <div>
                        <label for="name">Name: </label>
                        <input 
                        type="text"
                        value={pokemon.name}
                        name="name"
                        className='input'
                        onChange={handleChange}
                        />
                        {
                            errors.name && ( <p className="error">{errors.name}</p> )
                        }
                    </div>

                    <div>
                        <label htmlFor="">Image: </label>
                        <input 
                        type="text"
                        name="image"
                        value={pokemon.image}
                        className="input"
                        onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="">HP: </label>
                        <input 
                        type="number"
                        value={pokemon.hp}
                        name="hp"
                        className="input"
                        onChange={handleChange} 
                        />
                    </div>    

                    <div>
                        <label htmlFor="">Attack: </label>
                        <input 
                        type="number"
                        value={pokemon.attack}
                        name="attack"
                        className="input"
                        onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="">Defense: </label>
                        <input 
                        type="number"
                        value={pokemon.defense}
                        name="defense"
                        className="input"
                        onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="">Speed: </label>
                        <input 
                        type="number"
                        value={pokemon.speed}
                        name="speed"
                        className="input"
                        onChange={handleChange} 
                        />
                    </div>   

                    <div>
                        <label htmlFor="">Height: </label>
                        <input 
                        type="number"
                        value={pokemon.height}
                        name="height"
                        className="input"
                        onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <label htmlFor="">Weight: </label>
                        <input 
                        type="number"
                        value={pokemon.weight}
                        name="weight"
                        className="input"
                        onChange={handleChange} 
                        />
                    </div>

                    <div>
                        <select onChange={handleSelect} className={styles.select}>
                            {types.map((e) => (
                                <option value={e.name}>{e.name}</option>
                            ))}
                        </select>
                        <ul><li>{pokemon.types.map(el => el + " ,")}</li></ul>
                    </div>    
                    <button type="submit" className={styles.create_button}>Create</button>
                </form>
                { pokemon.types.map(el => 
                    <div>
                        <p>{el}</p>
                        <button className='botonX' onClick={() => handleDelete(el)}>x</button>
                    </div>
                    )}
            </div>
        </div>
    )
}