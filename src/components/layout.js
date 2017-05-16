import React from "react";

import List from "./list/list";
import Card from "./card/card";

import Data from "./list/list.json";


export default class Layout extends React.Component{

    // Layout.defaultProps = {
    //     listData: []
    // }

    render(){
        return(
            <div>
                <List listData={Data.list}/>
                <hr></hr>
                <Card/>
            </div>
        )
    }
}