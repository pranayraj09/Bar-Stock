import React from "react";

import Title from "../title/title";
import Data from "./card.json"

export default class Card extends React.Component{

    render(){

        let items = Object.keys(Data).map((card) => {
            let items = Data[card];
            return items.map((item) => {
                return Object.keys(item).map((i) => {
                    return item[i].map((obj) => {
                        return obj['product']
                    })
                })
            })
        })

        var finalCard = items.map(function(item){
            console.dir(items);
            return (

                    <tr>
                        <td> {items} </td>
                    </tr>

            );
        })

        return (
            <div>
                <Title title={"Orders"}/>
                <table>
                    <tbody>
                {finalCard}
                    </tbody>

                </table>
            </div>
        );
    }
}