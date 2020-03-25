import React from "react";
import Style from './index.css';
import Logo01 from './Pictures/Logo01.jpg';


class Header extends React.Component {
    render() {
        return(
            <div>
                <header className='headerStyle'>
                    <img className="image" src={Logo01} alt="Recipe Logo" />
                    <h1>RECIPE APP</h1>
                    
                </header>
            </div>
        )
    }
}

export default Header;