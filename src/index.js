import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './helpers/store';
import configureStore from './helpers/store';
import App from './components/App';
import * as serviceWorker from './helpers/serviceWorker';
import { ThemeProvider } from 'roni';

const store = configureStore();

function Index() {
    return (
        <ThemeProvider>
            <Provider store={store} context={ReactReduxContext}>
                <ConnectedRouter history={history} context={ReactReduxContext}>
                    <App />
                </ConnectedRouter>
            </Provider>
        </ThemeProvider>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.register();
