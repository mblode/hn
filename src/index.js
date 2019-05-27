import React from 'react';
import { render } from "react-snapshot";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import configureStore from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from 'pikcha-frame';

const store = configureStore();

render(
    <ThemeProvider>
        <Provider store={store} context={ReactReduxContext}>
            <ConnectedRouter history={history} context={ReactReduxContext}>
                <App />
            </ConnectedRouter>
        </Provider>
    </ThemeProvider>,
    document.getElementById("root")
);

serviceWorker.register();
