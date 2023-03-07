import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filterPokemonsByType, filterPokemonsCreated, getPokemons, orderByName } from '../../actions';
import NavBar from "../../components/NavBar/NavBar"
import Card from "../../components/Card/Card"
import Paginated from '../../components/Paginated/Paginated';
import './Home.css'


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
        <div >
            <NavBar />
            <button onClick={e => {handleClick(e)}}>Reload Pokemons</button>
            <div className="home">
                <div>
                    <select onChange={handleSort}>
                        <option value="filtro"> A-Z:</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <select onChange={handleFilterType}>
                        <option value="type"> Tipo </option>
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
                    <select onChange={handleFilterCreated}>
                        <option value="Todos"> Todos </option>
                        <option value="Creados"> Creados </option>
                        <option value="Existentes"> Existentes </option>
                    </select>
                    <Paginated 
                    pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                    />
                </div>
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
        </div>
    );
}