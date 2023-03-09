import React from 'react'
import styles from "./Paginated.module.css"

function Paginated({pokemonsPerPage, allPokemons, paginado}) {

  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <div >
      <nav>
        <ul className={styles.pagination}>
          {
            pageNumbers && 
            pageNumbers.map(number => (
              <li key={number} >
                <a onClick = {() => paginado(number)}>{number}</a>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default Paginated
