import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import configureStore from './store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
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
