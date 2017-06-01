import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

import Layout from "./components/layout";
import Cart from "./components/cart/cart";

const app = document.getElementById('app');
ReactDOM.render(
   <Router>
      <div>
        <Route exact path="/" component={Layout}/>
        <Route path="/cart" component={Cart}/>
      </div>
   </Router>, app);
