import logo from './logo.svg';
import './App.css';
import React from 'react';
import MainUi from './components/mainui.js';
import About from './components/about.js';
import Contact from './components/contact.js';
import { Route, Link } from 'react-router-dom';
import { getJoke } from './service.js'

class App extends React.Component {
  constructor() {
    super();

    let cheeseBurger = {
      item: "img",
      name: 'Cheese Burger',
      brand: "McDonalds",
      price: 4.00,
      qty: 0
    }

    let hotFries = {
      item: "img",
      name: 'Hot Salty Fries',
      brand: "Burger King",
      price: 1.00,
      qty: 0
    }

    let coldSoda = {
      item: "img",
      name: 'Very Cold Soda',
      brand: "CocaCola",
      price: .50,
      qty: 0
    }

    this.state = {
      joke: "",
      jokeInterval: null,
      totalQty: 0,
      total: 0,
      menuItems: [cheeseBurger, hotFries, coldSoda]
    }

    this.increaseItemQty = this.increaseItemQty.bind(this);
    this.decreaseItemQty = this.decreaseItemQty.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateJoke();
    this.setupRandomJoke();
  }



  updateJoke(){
    getJoke().then(data => {
      let jokeString = "";
      if (data.type === "twopart") {
        jokeString += data.setup + " " + data.delivery;
      }
      else {
        jokeString += data.joke;
      }
      this.setState({ joke: jokeString });
    });
  }

  setupRandomJoke() {
    if (this.state.jokeInterval) {
      clearInterval(this.state.jokeInterval);
    }

    const interval = setInterval(() => {
      this.updateJoke();
    }, 30000);

    this.setState({ jokeInterval: interval });
  }

  handleChange(e, item) {
    if (e.target.value <= 5 && e.target.value >= 0) {
      let updatedQty = e.target.value;
      let tempTotal = this.state.totalQty;
      let tempStateValue = this.state.total;
      tempStateValue -= item.price * item.qty;
      tempTotal -= item.qty;
      let newTotal = tempStateValue + item.price * updatedQty;
      let newTotalQty = tempTotal + parseInt(updatedQty);

      item.qty = parseInt(updatedQty);
      this.setState({ totalQty: newTotalQty });
      this.setState({ total: newTotal });
    }
  }

  increaseItemQty(item) {
    let qty = document.getElementById(`${item.name.replaceAll(" ","-")}-qty`).value;
    if (qty < 5) {
      item.qty = parseInt(item.qty) + 1;
      this.setState({ totalQty: parseInt(this.state.totalQty) + 1 });
      this.setState({ total: this.state.total + item.price });
    }
  }

  decreaseItemQty(item) {
    let qty = document.getElementById(`${item.name.replaceAll(" ","-")}-qty`).value;
    if (qty > 0) {
      item.qty = parseInt(item.qty) - 1;
      this.setState({ totalQty: parseInt(this.state.totalQty) - 1 });
      this.setState({ total: this.state.total - item.price });
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>

          <Route exact path="/">

            <MainUi increaseItemQty={this.increaseItemQty} decreaseItemQty={this.decreaseItemQty} handleChange={this.handleChange} menuItems={this.state.menuItems} total={this.state.total} totalQty={this.state.totalQty} joke={this.state.joke} />

          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

        </main>
      </div>
    );
  }
}
export default App;
