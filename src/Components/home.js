/* eslint-disable */
import React from 'react';
import { fetchProductList } from '../ProductActions/actions';
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
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default HomePage;
