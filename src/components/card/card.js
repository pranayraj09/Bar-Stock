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

        var finalCard = items.map(function(items){
            return <ul> {items} </ul>;
        })

        return (
            <div>
                <Title title={"Orders"}/>
                <table>
                    <tbody>
                        <tr>
                           <td> {finalCard} </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        );
    }
}