import React from "react";

import Title from "../title/title";


export default class List extends React.Component{



    render(){
        var orgData = this.props.listData;
        var list = [];
        for(let i = 0; i < orgData.length; i++){
            const obj = orgData[i];
            list.push(obj.product + " " + obj.quantity + " " + obj.measurement);
        }

        var finalList = list.map(function(items){
            return <ul> {items} </ul>;
        })

        return (
            <div>
                <Title title={"Bar Stock"}/>
                {finalList}
            </div>
        );
    }
}




