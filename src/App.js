import React, { Component } from "react";
import { HashRouter as Router } from "react-router-dom";
import routes from "./routes";
import "./reset.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1>Recipe Cards</h1>
          </header>
          {routes}
        </div>
      </Router>
    );
  }
}

export default App;
