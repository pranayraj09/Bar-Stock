import React from "react";

import "bootstrap/dist/css/bootstrap.min.css"
import "./cart.css";

export default class Card extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          cartItems: JSON.parse(localStorage.getItem("cartItems"))
        }
    }

    render(){
        let cartItems = Object.keys(this.state.cartItems).map(function(itemName) {
            return(
              <li key={itemName}>{itemName} : <b>{this.state.cartItems[itemName]}</b></li>
            )
        }.bind(this));

        return (
            <div className="container-fluid">
                <ul>
                  {cartItems}
                </ul>
                <button className="btn btn-default btn-lg" onClick={() => this.props.history.push('/')}>Back</button>
            </div>
        );
    }
}
