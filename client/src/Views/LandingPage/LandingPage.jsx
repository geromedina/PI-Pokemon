import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './LandingPage.module.css'

export default function LandingPage() {

//    const dispatch = useDispatch;

//    useEffect(() => {
//         dispatch(loadingPokemonsSet(true));
//    },[])
    
    return(
        <div className={styles.landing}>
            <div>
                <h1 className={styles.landing_title}>Welcome to Henry's Pokemon App</h1>
                <span className={styles.landing_text}>Discover the feactures of your favorite pokemons</span>
            </div>
            <Link to = '/home'>
                <button className={styles.start_button}>Start</button>
            </Link>
        </div>
    )
}