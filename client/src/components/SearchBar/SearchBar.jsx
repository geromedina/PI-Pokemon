import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../../actions';
import styles from "./SearchBar.module.css"

function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNamePokemons(name))
    }

  return (
    <div className={styles.search_bar}>
      <input
      className={styles.search_input}
      type='text'
      onChange= {(e) => handleInputChange(e)} 
      placeholder='Search Pokemon...'
      />
      <button type='submit' className={styles.search_button} onClick={(e) => handleSubmit(e)}> Search </button>
    </div>
  )
}

export default SearchBar
