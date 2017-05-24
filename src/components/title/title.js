import React from "react";

import "./title.css";

export default class Title extends React.Component{
    render(){
        return(
            <h1 className="heading">{this.props.title}</h1>
        )
    }
}