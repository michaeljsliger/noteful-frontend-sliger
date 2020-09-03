import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div className="header-container">
                <Link className="header-link" to="/"><h1>Noteful</h1></Link>
            </div>
        )
    }
}

export default Header;