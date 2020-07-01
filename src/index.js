import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/index";
import Product from "./pages/product";
import "./styles/index.css";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={hist}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" component={Product} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
