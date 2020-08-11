import React from 'react';
import { Link } from 'react-router-dom';
import { getTotalQuantity } from '../ProductActions/actions';
import './header.css';

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="header-container">
                <Link to="/" className="heading-wrapper">
                    <p className="heading-text">DigiMall</p>
                </Link>
                <Link to="/cartItems" className="cart-wrapper">
                    <button><i className="fa fa-shopping-cart">{'   '}{this.props.cartValue}</i></button>
                </Link>
            </div>
        );
    }
}

export default Header;
