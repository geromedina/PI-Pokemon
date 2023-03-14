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

        <ul className={styles.card_container_types}>
          {
            types && types.map((type, index) => {
              return <li className={styles.types_name} key={index}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</li>
            })
          }
        </ul>
        
        <div className={styles.card_container_types}>
            <span className={styles.text_attack}>Attack: {attack}</span>
        </div>

    </div>
  )
}

export default Card
