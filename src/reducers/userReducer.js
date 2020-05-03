import { handleActions } from 'redux-actions';

export default handleActions(
    {
        LOGIN_USER_SUCCESS: (state, action) => ({
            ...state,
            loggingIn: true,
            isFetchingUser: false,
            username: action.payload.username,
        }),
        LOGIN_USER_FAILURE: (state, action) => ({
            ...state,
            loggingIn: false,
            isFetchingUser: false,
            error: action.payload.error,
        }),
        LOGIN_USER_STARTED: (state) => ({
            ...state,
            isFetchingUser: true,
        }),
        UPVOTE_POST_SUCCESS: (state, action) => ({
            ...state,
            // loggingIn: true,
            // isFetchingUser: false,
            // username: action.payload.username,
        }),
        UPVOTE_POST_FAILURE: (state, action) => ({
            ...state,
            // loggingIn: false,
            // isFetchingUser: false,
            error: action.payload.error,
        }),
        UPVOTE_POST_STARTED: (state) => ({
            ...state,
            // isFetchingUser: true,
        }),
    },
    {
        loggingIn: false,
        isFetchingUser: false,
        username: null,
        error: null,
    }
);
