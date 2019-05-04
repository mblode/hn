import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer(history), // root reducer with router state
        preloadedState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
    );

    return store;
}
