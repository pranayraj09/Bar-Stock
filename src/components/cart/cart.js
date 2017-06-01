import React from "react";

import "bootstrap/dist/css/bootstrap.min.css"
import "./cart.css";

import Title from "../title/title";


export default class Card extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          cartItems: JSON.parse(localStorage.getItem("cartItems"))
        }
    }

    render(){
        let totalItems = 0;
        let cartItems = Object.keys(this.state.cartItems).map(function(itemName) {
            totalItems += this.state.cartItems[itemName];
            return(
                <div className="row summary-item">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <ul className="summary-quantity" key={itemName}> {(this.state.cartItems[itemName])?this.state.cartItems[itemName]:"-"} </ul>
                    </div>
                    <div className="col-lg-9 col-md-9 col-md-9 col-md-9">
                        <ul className="summary-name"> {itemName}</ul>
                    </div>
                </div>
                    )
        }.bind(this));

        return (
            <div className="container-fluid">
                <Title title={"Summary"}/>
                <br/>
                <span className="summary">
                  {cartItems}
                    <hr className="line"></hr>
                    <div className="row summary-item">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 summary-quantity">
                            {totalItems}
                        </div>
                        <div className="col-lg-9 col-md-9 col-md-9 col-md-9 summary-name">
                            Total
                        </div>
                    </div>
                </span>
                <br/>
                <div className="button">
                    <button className="btn btn-lg" onClick={() => this.props.history.push('/')}>Back</button>
                </div>
            </div>
        );
    }
}
