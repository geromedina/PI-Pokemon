import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './LandingPage.css'

export default function LandingPage() {

//    const dispatch = useDispatch;

//    useEffect(() => {
//         dispatch(loadingPokemonsSet(true));
//    },[])
    
    return(
        <div className='landing'>
            <div>
                <h1 className='landing_title'>Welcome to Henry's Pokemon App</h1>
                <span className='landing_text'>Discover the feactures of your favorite pokemons</span>
            </div>
            <Link to = '/pokemons'>
                <button className='start_button'>Start</button>
            </Link>
        </div>
    )
}