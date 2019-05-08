import { combineReducers } from "redux";
import { History } from 'history'
import { connectRouter } from "connected-react-router";
import postsReducer from "./postsReducer";

export default (history: History) => combineReducers({
    router: connectRouter(history),
    posts: postsReducer
});
