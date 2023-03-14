import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { useEffect } from 'react';
import { getDetail } from '../../actions';
import NavBar from '../../components/NavBar/NavBar';
import { Link } from 'react-router-dom';
import styles from "./Details.module.css"

export default function Detail(props){

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  },[dispatch]);

  const details = useSelector((state) => state.detail);
  console.log(details)

  return (
    <div>
      <NavBar />
      <div className={styles.main_container}>
        <div className={styles.card_container}>

          <div className={styles.card_container_title}>
              <span className={styles.card_title}>{details.name} (ID:{details.id})</span>
          </div>

          <div className={styles.card_container1}>
              <img src={details.image} alt="imagen" className={styles.card_img}/>
          </div>

          <div className={styles.stats_container}>
            <ul>
              <li className={styles.text_attack}>HP: {details.hp}</li>
              <li className={styles.text_attack}>Attack: {details.attack}</li>
              <li className={styles.text_attack}>Defense: {details.defense}</li>
              <li className={styles.text_attack}>Speed: {details.speed}</li>
              <li className={styles.text_attack}>Attack: {details.attack}</li>
              <li className={styles.text_attack}>Height: {details.height}</li>
              <li className={styles.text_attack}>Weight: {details.height}</li>
              {
                details.types && details.types.map((type, index) => {
                  return <li className={styles.text_attack} key={index}>Type: {type.name.charAt(0).toUpperCase() + type.name.slice(1)}</li>
                })
              }
            </ul>
          </div>
        </div>
        <Link to='/home'>
          <button className={styles.back_button}>Back home</button>
        </Link>
      </div>
    </div>
  )
}