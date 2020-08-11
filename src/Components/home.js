/* eslint-disable */
import React from 'react';
import { fetchItemDetails, addItemToCart, fetchProductList } from '../ProductActions/actions';
import './homepage.css'

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      productData: [],
    };
  }

  componentDidMount() {
    fetchProductList().then((data) => {
      this.setState({
        productData: data,
      });
    });
  }

  showProductDetails(id) {
    this.props.history.push(`/productDetails/${id}`);
  }

  // fetchProductData(key) {
  //   this.setState({
  //     detailsData: data,
  //   });
  // }

  getExistingQuantityFromCart(key) {
    let count = 0;
    let flag = false;
    if (localStorage.length === 0) {
      return count += 1;
    }
    let storedData = Object.values(localStorage);
    storedData = storedData.map(data => JSON.parse(data));
    let cartItems = Object.entries(storedData);
    for (let item of cartItems) {
      if (key === item[1].id) {
        flag = true;
        return item[1].quantity + 1;
      }
    }
    if (!flag) {
      return count += 1;
    }
  }

  addProductToCart(pKey) {
    const data = fetchItemDetails(pKey);
    var calQuantity = 0;
    var mQ;
    const updatedQuantity = this.getExistingQuantityFromCart(pKey);
    calQuantity = updatedQuantity;
    const obj1 = {
      id: "",
      name: "",
      price: "",
      quantity: 0,
    }
    if (data) {
      const d1 = Object.entries(data);
      if (d1) {
        d1.forEach(([key, element]) => {
          obj1.id = pKey;
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
    const { productData } = this.state;
    return (
      <div className="home-container">
        {
          productData.map(([key, element]) => (
            <div className="product-container" key={key}>
              <p>{element.name}</p>
              <p>₹ {element.price}</p>
              {' '}
              <div className="button-container">
                <button type="submit" onClick={() => this.showProductDetails(key)}>Details</button>
                <button type="submit" onClick={() => this.addProductToCart(key)}>Add to Cart</button>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default HomePage;
