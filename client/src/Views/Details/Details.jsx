import React from 'react'
import { useDispatch, useSelector } from 'react-router-dom';
import { getDetail } from '../../actions';
import { useEffect } from 'react';
import styles from "./Details.module.css"

function Details(props) {

  
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getDetail(props.match.params.id))
  // },[dispatch])

  // const myPokemon = useSelector((state) => state.detail)
  // console.log(props)

  return (
    <div className={styles.container}>
      
    </div>
  )
}

export default Details
