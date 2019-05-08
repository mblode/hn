import React from "react";
import { render } from "react-snapshot";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import configureStore from "./store";
import App from "./components/App";
import './index.css';
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

render(
    <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);

serviceWorker.unregister();
