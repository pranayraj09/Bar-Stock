import React from "react";
import ingList from "./list/list.json";
import productList from "./card/card.json"


import List from "./list/list";
import Card from "./card/card";
import update from 'immutability-helper';


export default class Layout extends React.Component{

    constructor(props){
        super(props);
        // let ingredientList = {};
        // ingList.list.map((item) => {
        //     ingredientList[item.product] = item;
        // });
        // console.log(ingredientList);
        this.state = {
            ingredient: ingList.list,
            products: productList.card,
            quantity: {}
        }
        this.changeQty = this.changeQty.bind(this);
        this.getIndex = this.getIndex.bind(this);

    }

    getIndex(value, arr, prop) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }

    changeQty(prod, action, ingredient){
        // console.log(this.state.ingredient);
        let ingredientObject = this.state.ingredient;
        ingredient.map((item) => {
            let index = this.getIndex(item.product, ingredientObject, 'product');
            let obj = ingredientObject[index];
            let newQty = obj.quantity;
            if(obj.quantity < item.quantity){
                alert("Stock is not available");
            }else {
                newQty = ((obj.quantity) - (item.quantity));
            }
            let newItemObj = update(obj, {'quantity':{$set:newQty}});
            ingredientObject = update(ingredientObject, {[index]:{$set:newItemObj}});
        })
        this.setState({
            ingredient:ingredientObject
        });


        let obj = {};
        let value = (typeof this.state.quantity[prod] !== 'undefined')?this.state.quantity[prod]:0;
        switch(action){
            case "increase":
                obj[prod] = value+1;
                this.setState({
                    quantity:update(this.state.quantity,{$merge:obj})
                });
                break;
            case "decrease":
                obj[prod] = (value <= 0)?0:value-1;
                this.setState({
                    quantity:update(this.state.quantity,{$merge:obj})
                });
                break;
        }
    }

    render(){
        // console.log(this.state.ingredient);
        return(
            <div>
                <List ingredient={this.state.ingredient}/>
                <hr></hr>
                <Card products={this.state.products} quantity={this.state.quantity} changeQty={this.changeQty}/>
            </div>
        )
    }
}