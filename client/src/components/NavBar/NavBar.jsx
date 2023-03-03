import { Link } from "react-router-dom";
import logo from '../../pictures/pokeball.png'
import pokemon from '../../pictures/pokemon_logo.png'
import './NavBar.css'


export default function NavBar(){
    return(
        <div className="nav_bar">
            <div className="nav_conteiner">
                <div className="nav_left_side">
                    <Link to="/">
                        <img src={logo} className="nav_bar_logo" alt="Pokemon App" />
                    </Link>
                    <div className="menu">
                        <ul>
                            <li>
                                <Link to="/pokemons">Home</Link>
                            </li>
                            <li>
                                <Link to="/create">Create</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="nav_right_side">
                    <img src={pokemon} alt="Pokemon Logo" className="pokemon"/>
                </div>
            </div>
        </div>
    )
}