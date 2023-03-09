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
      placeholder='Search Pokemon...'
      onChange={handleInputChange} />
      <button type='submit' onClick={handleSubmit} className={styles.search_button}>Search</button>
    </div>
  )
}

export default SearchBar
