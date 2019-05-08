import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

export const history = createBrowserHistory();

export default function configureStore(preloadedState: object) {
    const store = createStore(
        rootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(routerMiddleware(history), thunk),
            (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    return store;
}
