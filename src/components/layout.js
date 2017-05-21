import React from "react";

import List from "./list/list";
import Card from "./card/card";


export default class Layout extends React.Component{

    render(){
        return(
            <div>
                <List/>
                <hr></hr>
                <Card/>
            </div>
        )
    }
}