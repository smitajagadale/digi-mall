/* eslint-disable */
import React from 'react';
import { fetchProductDetails, addItemToCart, fetchProductList } from '../ProductActions/actions';
import { PRODUCT_KEYS } from '../productCatalog';
import Loader from './loader';
import './productDetailsPage.css';


class ProductDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.match.params.id;
        this.state = {
            detailsData: null,
            loading: true,
            error: null,
            quantity: 0,
            disabled: false,
        }
    }

    componentDidMount() {
        fetchProductDetails(this.id).then(item => this.setState(
            {
                loading: false,
                detailsData: item,
            }
        )).catch(err => this.setState({
            error: err,
        }));
    }

    // disableAddToCart(maxQuantity) {
    //     if (this.state.quantity === maxQuantity) {
    //         this.setState({
    //             disabled: true,
    //         })
    //     }
    // }

    renderSpecificationData() {
        if (this.state.detailsData && this.state.detailsData.length === 2) {
            const d1 = Object.entries(this.state.detailsData[1]);
            if (d1) {
                return d1.map(([key, element]) => (
                    <tr key={key}>
                        <td>{PRODUCT_KEYS[key]}</td>
                        {key === 'price' ? <td>₹ {element}</td> : <td>{element}</td>}
                    </tr>
                ))
            }
        }

    }

    getExistingQuantityFromCart() {
        let count = 0;
        if (localStorage.length === 0) {
            return count += 1;
        }
        let storedData = Object.values(localStorage);
        storedData = storedData.map(data => JSON.parse(data));
        let cartItems = Object.entries(storedData);
        for (let item of cartItems) {
            if (this.id === item[1].id) {
                return item[1].quantity + 1;
            }
            else {
                return count += 1;
            }
        }
    }

    addItemToCart(id) {
        var calQuantity = 0;
        var mQ;

        const updatedQuantity = this.getExistingQuantityFromCart();
        calQuantity = updatedQuantity;

        const obj1 = {
            id: "",
            name: "",
            price: "",
            quantity: 0,
        }
        if (this.state.detailsData) {
            const d1 = Object.entries(this.state.detailsData);
            if (d1) {
                d1.forEach(([key, element]) => {
                    obj1.id = this.id;
                    obj1.name = element.name;
                    obj1.price = element.price;
                    mQ = element.maxQuantity;
                })
            }
        }
        obj1.quantity = calQuantity;
        addItemToCart(obj1);
        this.props.getQuantity();
    }

    render() {
        return (
            <div>
                <div className="loader-container">{this.state.loading === true ? <Loader /> : ''}</div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Specification</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSpecificationData()}
                    </tbody>
                </table>
                <div className="addToCart-wrapper">
                    <button type="submit" disabled={this.state.disabled} onClick={() => this.addItemToCart(this.id)}>Add to Cart</button>
                </div>
            </div>
        );
    }
}

export default ProductDetailsPage;
