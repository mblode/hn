import * as React from "react";
import { render } from 'react-dom'
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import configureStore from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const initialState = {};

const store = configureStore(initialState);

const Root = () => (
    <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <App />
        </ConnectedRouter>
    </Provider>
);


render(
    <Root />, document.getElementById("root")
);

serviceWorker.unregister();
