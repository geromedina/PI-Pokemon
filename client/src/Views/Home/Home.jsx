import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filterPokemonsByType, filterPokemonsCreated, getPokemons, orderByName } from '../../actions';
import NavBar from "../../components/NavBar/NavBar"
import Card from "../../components/Card/Card"
import Paginated from '../../components/Paginated/Paginated';
import styles from "./Home.module.css"


export default function Home() {


    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const [orden, setOrden ] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage // 12
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage // 0
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getPokemons());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }

    function handleFilterType(e){
        dispatch(filterPokemonsByType(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterPokemonsCreated(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <NavBar />
            <div className={styles.main_cointainer}>
                <button onClick={e => {handleClick(e)}} className={styles.reload_button}>Reload Pokemons</button>
                <div className={styles.main_cointainer}>
                    <div className={styles.filters_container}>
                        <div className={styles.content_select}>
                            <select onChange={handleSort}>
                                <option value="filtro"> A-Z:</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                            <i></i>
                        </div>
                        <div className={styles.content_select}>
                            <select onChange={handleFilterType}>
                                <option value="type"> Types </option>
                                <option value="normal"> Normal </option>
                                <option value="flying"> Flying </option>
                                <option value="poison"> Poison </option>
                                <option value="ground"> Ground </option>
                                <option value="bug"> Bug </option>
                                <option value="fire"> Fire </option>
                                <option value="water"> Water </option>
                                <option value="grass"> Grass </option>
                                <option value="electric"> Electric </option>
                                <option value="fairy"> Fairy </option>
                            </select>
                            <i></i>
                        </div>
                        <div className={styles.content_select}>
                            <select onChange={handleFilterCreated}>
                                <option value="Todos"> All </option>
                                <option value="Creados"> Created </option>
                                <option value="Existentes"> Existent </option>
                            </select>
                            <i></i>
                        </div>
                    </div>
                    <div className={styles.pokemon_container}>
                        {
                            allPokemons && currentPokemons.map((el) => {
                                return (
                                    <Card 
                                    name={el.name}
                                    image={el.image}
                                    types= {el.types}
                                    attack={el.attack}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className={styles.pagination_container}>
                        <Paginated 
                            pokemonsPerPage={pokemonsPerPage}
                            allPokemons={allPokemons.length}
                            paginado={paginado}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}