import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import reportWebVitals from './reportWebVitals';
import './index.css'

const Index = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();