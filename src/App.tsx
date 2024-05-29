import "./App.css";
import React from "react";
import Workers from "./Workers/Workers";
import Companies from "./Companies/Companies";
import { Provider } from "react-redux";
import store from "./Store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Companies />
        <Workers />
      </div>
    </Provider>
  );
}

export default App;
