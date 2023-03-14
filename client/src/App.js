import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Views/LandingPage/LandingPage';
import Home from './Views/Home/Home';
import Details from './Views/Details/Details';
import PokemonCreate from './Views/PokemonCreate/PokemonCreate';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { getPokemons, getTypes } from './actions';



function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons()); 
  })

  return (
    <BrowserRouter>
      <Routes>  
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route exact path="/home/:id" element={<Details />} />
        <Route exact path="/create" element={<PokemonCreate />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
