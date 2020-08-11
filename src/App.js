import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomePage from './Components/home';
import ProductDetailsPage from './Components/productDetailsPage';
import Header from './Components/header';
import CartPage from './Components/cartPage';
import './App.css';
import { getTotalQuantity } from './ProductActions/actions';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartValue: 0,
    };
  }

  componentDidMount() {
    this.getItemsQuantityFromCart();
  }

  getItemsQuantityFromCart() {
    getTotalQuantity().then((q) => this.setState({
      cartValue: q,
    }));
  }

  render() {
    return (
      <Router>
        <div>
          <Header cartValue={this.state.cartValue} />
          <div className="router-container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/productDetails/:id" component={props => <ProductDetailsPage getQuantity={this.getItemsQuantityFromCart.bind(this)} {...props} />} />
              <Route path="/cartItems" component={props => <CartPage getQuantity={this.getItemsQuantityFromCart.bind(this)} {...props} />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
