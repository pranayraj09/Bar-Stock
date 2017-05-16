import React from "react";

import Title from "../title/title";
import Data from "./list.json";

export default class List extends React.Component{

    render(){
        var list = [];
        for(let i = 0; i < Data.list.length; i++){
            const obj = Data.list[i];
            list.push(obj.product + " " + obj.quantity + " " + obj.measurement);
        }

        var finalList = list.map(function(items){
            return <ul> {items} </ul>;
        })

        return (
            <div>
                <Title title={"Bar Stock"}/>
                <ul> {finalList} </ul>
            </div>
        );
    }
}