import React from "react";
import ingList from "./list/list.json";
import productList from "./card/card.json"


import List from "./list/list";
import Card from "./card/card";
import update from 'immutability-helper';

export default class Layout extends React.Component{

    constructor(props){
        super(props);
        let cartItems = JSON.parse(localStorage.getItem("cartItems"));
        this.state = {
            ingredient: ingList.list,
            products: productList.card,
            quantity: cartItems
        }
        this.changeQty = this.changeQty.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.validateQty = this.validateQty.bind(this);
        this.updateCartItems = this.updateCartItems.bind(this);

        let totalItem = {};
        this.state.products.map(function(item){
            Object.keys(item).map((v) => {
                totalItem[v] = 0;
            })
        });
        localStorage.setItem("cartItems",JSON.stringify(totalItem));

    }

    updateCartItems(updated){
        // console.log(updated)
    }

    getIndex(value, arr, prop) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    validateQty(ingredient){
        let ingredientObject = this.state.ingredient;
        let validate = 0;
        ingredient.map((item) => {
            let index = this.getIndex(item.product, ingredientObject, 'product');
            let obj = ingredientObject[index];
            if(parseInt(obj.quantity) >= parseInt(item.quantity)){
                validate++;
            }
        })
        return validate;
    }

    changeQty(prod, action, ingredient){
        let availableQty = this.validateQty(ingredient);
        // console.log(availableQty);
        // console.log( ingredient.length);
        if(availableQty < ingredient.length){
            alert("Stock not available")
        }else {
            let ingredientObject = this.state.ingredient;
            ingredient.map((item) => {
                let index = this.getIndex(item.product, ingredientObject, 'product');
                let obj = ingredientObject[index];
                // let newQty = obj.quantity;
                let newQty = ((obj.quantity) - (item.quantity));
                let newItemObj = update(obj, {'quantity': {$set: newQty}});
                ingredientObject = update(ingredientObject, {[index]: {$set: newItemObj}});
            })
            this.setState({
                ingredient: ingredientObject
            });


            let obj = {};
            let value = (typeof this.state.quantity[prod] !== 'undefined') ? this.state.quantity[prod] : 0;
            switch (action) {
                case "increase":
                    obj[prod] = value + 1;
                    this.setState({
                        quantity: update(this.state.quantity, {$merge: obj})
                    });
                    break;
                case "decrease":
                    obj[prod] = (value <= 0) ? 0 : value - 1;
                    this.setState({
                        quantity: update(this.state.quantity, {$merge: obj})
                    });
                    break;
            }
        }
    }

    placeOrder(){
      let items = JSON.stringify(this.state.quantity);
      localStorage.setItem("cartItems", items);
      this.props.history.push('cart')
    }

    render(){
        return(
            <div>
                <List
                  ingredient={this.state.ingredient}
                  cartItems={this.state.quantity}
                  products={this.state.products}
                  getIndex={this.getIndex}
                  updateCartItems={this.updateCartItems}/>
                <hr></hr>
                <Card products={this.state.products} quantity={this.state.quantity} changeQty={this.changeQty}/>
                <br/>
                <div className="button">
                    <button className="btn btn-lg" onClick={() => this.placeOrder()}>Place Order</button>
                </div>
            </div>
        )
    }
}
