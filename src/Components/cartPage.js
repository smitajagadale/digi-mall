import React from 'react';
import { Link } from 'react-router-dom';
import './cartPage.css';


class CartPage extends React.Component {
    constructor() {
        super();
        this.state = {
            storedItems: Object.values(localStorage),
        }
    }

    removeItemFromCart(key) {
        localStorage.removeItem(key);
        this.setState({
            storedItems: Object.values(localStorage),
        })
        this.displayCartData();
        this.props.getQuantity();
    }

    displayCartData() {
        let storedData = this.state.storedItems;
        storedData = storedData.map(data => JSON.parse(data));
        let cartItems = Object.entries(storedData);
        return cartItems.map(([key, element]) => (
            <tr>
                <td>{element.name}</td>
                <td>₹ {element.price}</td>
                <td>{element.quantity}</td>
                <td>
                    <div className="removeitem-wrapper">
                        <button type="submit" onClick={() => this.removeItemFromCart(element.id)}>Remove</button>
                    </div></td>
            </tr>
        ))

    }

    deleteAllCartEntries() {
        localStorage.clear();
        this.setState({
            storedItems: Object.values(localStorage),
        })
        this.displayCartData();
        this.props.getQuantity();
    }

    render() {
        return (
            <div className="parent-cart">
                <div className="cart-entry-container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Products</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayCartData()}
                        </tbody>
                    </table>
                </div>
                <div className="button-container">
                    <button type="submit" onClick={() => this.deleteAllCartEntries()}>Empty Cart</button>
                    <Link to="/" className="checkout-container">
                        <button type="submit">Proceed To Checkout</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default CartPage;