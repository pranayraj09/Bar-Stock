import React from "react";

import Title from "../title/title";
import Data from "./list.json";


export default class List extends React.Component{

    render(){

        let orgData = Data.list;
        console.log(orgData)
        let list = [];
        for(let i = 0; i < orgData.length; i++){
            const obj = orgData[i];
            list.push(obj.product + " " + obj.quantity + " " + obj.measurement);
        }

        var finalList = list.map(function(items){
            return <li> {items} </li>;
        })



        return (
            <div>
                <Title title={"Bar Stock"}/>
                {finalList}
            </div>
        );
    }
}




