import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../../actions';
import NavBar from "../../components/NavBar/NavBar"
import styles from "./PokemonCreate.module.css"


function validate(input){
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required.';
    } 
    
    if (!input.image) {
        errors.image = 'Image is required';
    }

    if (!input.hp) {
        errors.hp = 'HP is required';
    }

    if (!input.attack) {
        errors.attack = 'Attack is required';
    }

    return errors;
}


export default function PokemonCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.types);
    
    const [ errors, setErrors ] = useState({});

    const [ pokemon, setPokemon] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
    });

    useEffect(() => {
        dispatch(getTypes());
    },[])

    function handleChange(e) {
        e.preventDefault();
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({
            ...pokemon,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSelect(e){
        setPokemon({
            ...pokemon,
            types: [...pokemon.types, e.target.value],
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(pokemon)
        dispatch(postPokemon(pokemon))
        alert("Pokemon successfully created!")
        setPokemon({
            name: "",
            image: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,    
            types: [],
        })
        navigate("/home")
    }

    function handleDelete(el){
        setPokemon({
            ...pokemon,
            types: pokemon.types.filter( t => t !== el)
        })
    }

    return(
        <div>
            <NavBar />
            <div className={styles.container}>
                <form className={styles.form_containter} onSubmit={handleSubmit}>
                    <h3 className={styles.form_title}>Create your pokemon!</h3>

                    <div>
                        <label for="name">Name: </label>
                        <input 
                        onChange={handleChange}
                        id="name"
                        name="name"
                        type="text"
                        value={pokemon.name}
                        className='input'
                        />{" "}
                        {
                            errors.name && ( <p className="error">{errors.name}</p> )
                        }
                    </div>

                    <div>
                        <label htmlFor="">Image: </label>
                        <input 
                        onChange={handleChange} 
                        name="image"
                        type="text"
                        value={pokemon.image}
                        className="input"
                        />{" "}
                        {
                            errors.image && ( <p className="error">{errors.image}</p> )
                        }
                    </div>

                    <div>
                        {" "}
                        <label htmlFor="">HP: </label>
                        <input 
                        onChange={handleChange} 
                        name="hp"
                        type="number"
                        value={pokemon.hp}
                        className="input"
                        />{" "}
                        {
                            errors.hp && ( <p className="error">{errors.hp}</p> )
                        }
                    </div>    

                    <div>
                        <label htmlFor="">Attack: </label>
                        <input 
                        onChange={handleChange} 
                        name="attack"
                        type="number"
                        value={pokemon.attack}
                        className="input"
                        /> {" "}
                        {
                            errors.attack && ( <p className="error">{errors.attack}</p> )
                        }
                    </div>

                    <div>
                        <label htmlFor="">Defense: </label>
                        <input 
                        onChange={handleChange} 
                        name="defense"
                        type="number"
                        value={pokemon.defense}
                        className="input"
                        /> {" "}
                    </div>

                    <div>
                        <label htmlFor="">Speed: </label>
                        <input 
                        onChange={handleChange} 
                        name="speed"
                        type="number"
                        value={pokemon.speed}
                        className="input"
                        /> {" "}
                    </div>   

                    <div>
                        {" "}
                        <label htmlFor="">Height: </label>
                        <input 
                        onChange={handleChange} 
                        name="height"
                        type="number"
                        value={pokemon.height}
                        className="input"
                        /> {" "}
                    </div>

                    <div>
                        <label htmlFor="">Weight: </label>
                        <input 
                        onChange={handleChange} 
                        name="weight"
                        type="number"
                        value={pokemon.weight}
                        className="input"
                        /> {" "}
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