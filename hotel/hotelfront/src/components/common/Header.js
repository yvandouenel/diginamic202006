import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = (props) => {
    const isSelected = (path) => {
        return (path === props.path) ? "btn-danger" : "btn-secondary";
    }
    return (
        <header className="container">
            <div className="row align-items-center">
                <div className="col-md-4 "><img className="img-fluid" src="/logo-hotel.png" alt="retour accueil - logo Hôtel Filiberto" /></div>
                <div className="col-md-8">
                    <div id="wrapper-nav-baseline" className="d-flex flex-column justify-content-between" >
                    <nav >
                        <ul className="list-unstyled d-flex justify-content-end">
                            <li><Link className={`p-1 m-1 h3 btn ${isSelected("/")}`} to="/">Accueil</Link></li>
                            <li><Link className={`p-1 m-1 h3 btn ${isSelected("/admin")}`} to="/admin">Admin</Link></li>
                        </ul>
                    </nav>
                    <h1>L'hôtel qu'il vous faut !</h1>
                    </div>
                    
                </div>
                
            </div>
        </header>
    );
}

export default Header;