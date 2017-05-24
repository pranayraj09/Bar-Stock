import React from "react";

import Title from "../title/title";

import "./list.css";


export default class List extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        var finalList = this.props.ingredient.map(function(item){
            return (
                <li className="stock-ings">
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




