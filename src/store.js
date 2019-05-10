import { createStore, applyMiddleware, compose } from "redux";
import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export const history = createHashHistory({
    basename: "hn-react"
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer(history),
        preloadedState,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
    );

    return store;
}
