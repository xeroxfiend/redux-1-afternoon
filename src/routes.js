import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Name from "./components/Name/Name";
import Author from "./components/Author/Author";
import Ingredients from "./components/Ingredients/Ingredients";
import Instructions from './components/Instructions/Instructions';


export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/add/name" component={Name} />
    <Route path="/add/author" component={Author} />
    <Route path="/add/ingredients" component={Ingredients} />
    <Route path="/add/instructions" component={Instructions} />
  </Switch>
);
