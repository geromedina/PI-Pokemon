import React from 'react'
import styles from "./Card.module.css"

function Card({ name, types, attack, image}) {
  return (
    <div className={styles.card_container}>

        <div className={styles.card_container_title}>
            <span className={styles.card_title}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
        </div>

        <div className={styles.card_container1}>
            <img src={image} alt="imagen" className={styles.card_img}/>
        </div>

        <div className={styles.card_container_types}>
            {
              <span className={styles.types_name}>
            {
              typeof types[0] === 'string' ? types[0].charAt(0).toUpperCase() + types[0].slice(1) : types[0]?.name.charAt(0).toUpperCase() +
              types[0].name.slice(1)}   
            { 
                typeof types[1] === 'string' ? " - " + types[1]   :  types[1]?.name
            }            
              </span>
            }
        </div>

        <div className={styles.card_container_types}>
            <span className={styles.text_attack}>Attack: {attack}</span>
        </div>

    </div>
  )
}

export default Card
