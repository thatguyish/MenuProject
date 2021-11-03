import React, { Component } from "react";

class MainUi extends Component {

    render() {
        return (
            <div>
                <h1>Order Now</h1>
                <h2>Here's a joke while you order: {this.props.joke}</h2>
                <h3>You have {this.props.totalQty} items in your cart</h3>
                <table id="menu">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.menuItems.map(item => {
                                return (
                                    <tr key={item.name}>
                                        <td id={`${item.name.replaceAll(" ","-")}-img`}></td>
                                        <td>{item.name}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <button onClick={() => this.props.decreaseItemQty(item)}>-</button>
                                            <input id={`${item.name.replaceAll(" ","-")}-qty`} type="number" onChange={(e) => this.props.handleChange(e, item)} value={item.qty}></input>
                                            <button onClick={() => this.props.increaseItemQty(item)}>+</button>
                                        </td>
                                        <td>
                                            {item.qty>0 ? `Enjoy your ${item.name}`:`No ${item.name} today?`}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <h2 id="total">Total: &#36;{this.props.total}</h2>
            </div>
        );
    }
}

export default MainUi;