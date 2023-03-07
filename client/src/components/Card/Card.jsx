import React from 'react'

function Card({ name, types, attack, image}) {
  return (
    <div>
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img src={image} alt="imagen" className="img"/>
      <ul>
        <li className="type">
        {
              typeof types[0] === 'string' ? types[0].charAt(0).toUpperCase() + types[0].slice(1) : types[0]?.name.charAt(0).toUpperCase() +
              types[0].name.slice(1)}   
               { 
               typeof types[1] === 'string' ? " - " + types[1]   :  types[1]?.name
        }
        </li>
        <li className="attack">Attack: {attack}</li>
      </ul>
    </div>
  )
}

export default Card
