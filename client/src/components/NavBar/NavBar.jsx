import { Link } from "react-router-dom";
import logo from '../../pictures/pokeball.png'
import pokemon from '../../pictures/pokemon_logo.png'
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css"


export default function NavBar(){
    return(
        <div className={styles.nav_bar}>
            <div className={styles.nav_conteiner}>
                <div className={styles.nav_left_side}>
                    <Link to="/">
                        <img src={logo} className={styles.nav_bar_logo} alt="pokeball" />
                    </Link>
                    <div className={styles.menu}>
                        <ul>
                            <li>
                                <Link to="/home">Home</Link>
                            </li>
                            <li>
                                <Link to="/create">Create</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <SearchBar/>
                </div>
                <div className={styles.nav_right_side}>
                    <img src={pokemon} alt="Pokemon Logo" className={styles.pokemon}/>
                </div>
            </div>
        </div>
    )
}