import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../../actions';
import NavBar from "../../components/NavBar/NavBar"
import './Home.css'


export default function Home() {

    // Es para usar esta constante para ir despachando estas acciones
    const dispatch = useDispatch()

    // Esto es lo mismo que hacer el mapStateToProps, es mas facil
    // con el useSelector, traeme todo lo que esta en el estado de pokemons y dejalo en allPokemons
    const allPokemons = useSelector((state) => state.pokemons)

    // Ahora con useEffect nos vamos a traer los pokemons cuando el componente se monta

    // Seria lo mismo que hacer el mapDispatchToProps
    useEffect(() => {
        dispatch(getPokemons());
    },[])
    // Le ponemos el arreglo vacio en el segundo parametro del useEffect para que no haga llamadas infinitas

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }


    // Aca renderizamos
    return (
        <div >
            <NavBar />
            <button onClick={e => {handleClick(e)}}>Volver a cargar pokemons</button>
        </div>
    );
}