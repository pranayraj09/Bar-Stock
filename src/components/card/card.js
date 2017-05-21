import React from "react";

import Title from "../title/title";
import Data from "./card.json"

import "bootstrap/dist/css/bootstrap.min.css"
import style from "./card.css";

export default class Card extends React.Component{

    constructor(props){
        super(props);
        this.state = {
}
        this.changeQty = this.changeQty.bind(this);
    }

    changeQty(prod, action){
        let obj = {};
        let value = (typeof this.state[prod] != 'undefined')?this.state[prod]:0;
        switch(action){
            case "increase":
                obj[prod] = value+1;
                this.setState(obj);
                break;
            case "decrease":
                obj[prod] = (value <= 0)?0:value-1;
                this.setState(obj);
                break;
        }
    }

    render(){
        let items = Object.keys(Data).map((card) => {
            return Data[card].map((item) => {
                return Object.keys(item).map((prod) => {
                    let elm = item[prod];
                    return (
                        <div className="col-lg-2 menu-item">
                                <div className="panel-heading">{prod}</div>
                                <div className="panel-body ings">

                                {
                                    Object.keys(elm).map((key) => {
                                        let ingredients = elm[key];
                                        return (
                                                <div className="ingredients row">
                                                    <div className="quantity col-lg-1"> {ingredients.quantity}</div>
                                                    <div className="measurement col-lg-2"> {ingredients.measurement}</div>
                                                    <div className="product col-lg-7"> {ingredients.product}</div>
                                                </div>
                                        )
                                    })
                                }
                                </div>

                                <div className="panel-body plus-minus col-lg-12">
                                    <button className="col-lg-4 glyphicon glyphicon-plus" onClick={ () => {this.changeQty(prod, 'increase')}}/>
                                    <span className="col-lg-4 quantity-box">
                                        <input className="form-control" type="text" value={(this.state[prod])?this.state[prod]:0}/>
                                    </span>
                                    <button className="col-lg-4 glyphicon glyphicon-minus" onClick={ () => {this.changeQty(prod,'decrease')}}/>
                                </div>
                        </div>

                    )
                })
            })
        });

        return (
            <div className="container-fluid">
                <Title title={"Orders"}/>
                <div className="row items">{items}</div>
            </div>
        );
    }
}