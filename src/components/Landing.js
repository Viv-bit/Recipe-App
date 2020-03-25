import React from 'react';
import Style from './index.css';
import Backdrop from './Pictures/Backdrop.jpg';

class Landing extends React.Component {
    render() {
        return(
            <div className="land">
                <img className="Screen" src={ Backdrop } />
            </div>
        )
    }
}

export default Landing;