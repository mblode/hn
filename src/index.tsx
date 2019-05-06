import React from "react";
import ReactDOM from 'react-dom'
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import configureStore from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { object } from "prop-types";

const initialState = {};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
