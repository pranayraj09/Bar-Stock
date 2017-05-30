import React from "react";
import update from 'immutability-helper';

import Title from "../title/title";

import "./list.css";


export default class List extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          ingredient:this.props.ingredient
        }
    }

    componentWillMount(){
      let cartItems = this.props.cartItems;
      let updatedQty = null;
      Object.keys(cartItems).forEach(function(key, value){
        let index = this.getProductIndex(key, this.props.products);
        let product = this.props.products[index];
        updatedQty = this.getLeftQty(product, cartItems[key], ((updatedQty)?updatedQty:this.state.ingredient));
      }.bind(this));
      this.setState({
          ingredient: updatedQty
      });
      this.props.updateCartItems(updatedQty);
    }

    componentWillReceiveProps(){
      this.setState({
          ingredient: this.props.ingredient
      });
    }

    getProductIndex(value, arr) {
        for(var i = 0; i < arr.length; i++) {
            if(Object.keys(arr[i])[0] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    getLeftQty(ingredient, qty, ingredientList){
      let ingredientObject = ingredientList;
      Object.keys(ingredient).map((key) => {
        ingredient[key].map((item) => {
          let index = this.props.getIndex(item.product, ingredientObject, 'product');
          let obj = ingredientObject[index];
          // let newQty = obj.quantity;
          let newQty = ((obj.quantity) - ((item.quantity)*qty));
          let newItemObj = update(obj, {'quantity': {$set: newQty}});
          ingredientObject = update(ingredientObject, {[index]: {$set: newItemObj}});
        })
      })
      return ingredientObject;
    }

    render(){
        var finalList = this.state.ingredient.map(function(item){
            return (
                <li key={item.product} className="stock-ings">
                    <span className="prod-name">
                        {item.product}
                    </span>
                    <span className="prod-units">
                        <span className="prod-qty">
                            {item.quantity}
                        </span>
                        <span className="measurement-qty">
                            &nbsp; {item.measurement}
                        </span>
                    </span>
                </li>
            )
        })

        return (
            <div>
                <Title title={"Bar Stock"}/>
                <ul className="container-fluid ingredient-list">
                    {finalList}
                </ul>
            </div>
        );
    }
}
