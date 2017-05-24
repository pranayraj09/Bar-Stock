import React from "react";

import Title from "../title/title";

import "bootstrap/dist/css/bootstrap.min.css"
import "./card.css";

export default class Card extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        let items = this.props.products.map((item) => {
                return Object.keys(item).map((prod) => {
                    let elm = item[prod];
                    return (
                        <div className="col-lg-2 col-md-3 col-sm-4 col-xs-12 menu-item">
                                <div className="panel-heading">{prod}</div>
                                <div className="panel-body ings">

                                {
                                    Object.keys(elm).map((key) => {
                                        let ingredients = elm[key];
                                        return (
                                                <div className="ingredients row">
                                                    <div className="quantity col-lg-1 col-md-1 col-sm-1 col-xs-1"> {ingredients.quantity}</div>
                                                    <div className="measurement col-lg-2  col-md-2 col-sm-2 col-xs-2"> {ingredients.measurement}</div>
                                                    <div className="product col-lg-7 col-md-7 col-sm-7 col-xs-7"> {ingredients.product}</div>
                                                </div>
                                        )
                                    })
                                }
                                </div>

                                <div className="panel-body plus-minus col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <button className="col-lg-4 col-md-4  col-sm-4 col-xs-4 glyphicon glyphicon-plus" onClick={ () => {this.props.changeQty(prod, 'increase', elm)}}/>
                                    <span className="col-lg-4 col-md-4 col-sm-4 col-xs-4 quantity-box">
                                        <input className="form-control" type="text" value={(this.props.quantity[prod])?this.props.quantity[prod]:0} readOnly/>
                                    </span>
                                    <button className="col-lg-4 col-md-4 col-sm-4 col-xs-4 glyphicon glyphicon-minus" onClick={ () => {this.props.changeQty(prod,'decrease', elm)}}/>
                                </div>
                        </div>

                    )
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