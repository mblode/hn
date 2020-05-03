import { handleActions } from 'redux-actions';

export default handleActions(
    {
        FETCH_FEED_SUCCESS: (state, action) => ({
            ...state,
            isFetching: false,
            feed: {
                ...state.feed,
                [action.payload.type]: action.payload.data,
            },
        }),
        FETCH_FEED_FAILURE: (state, action) => ({
            ...state,
            isFetching: false,
            error: action.payload.error,
        }),
        FETCH_FEED_STARTED: (state) => ({
            ...state,
            isFetching: true,
        }),
        FETCH_COMMENTS_SUCCESS: (state, action) => ({
            ...state,
            isFetching: false,
            data: action.payload.data,
        }),
        FETCH_COMMENTS_FAILURE: (state, action) => ({
            ...state,
            isFetching: false,
            error: action.payload.error,
        }),
        FETCH_COMMENTS_STARTED: (state) => ({
            ...state,
            isFetching: true,
        }),
        FETCH_USER_SUCCESS: (state, action) => ({
            ...state,
            isFetching: false,
            user: action.payload.user,
        }),
        FETCH_USER_FAILURE: (state, action) => ({
            ...state,
            isFetching: false,
            error: action.payload.error,
        }),
        FETCH_USER_STARTED: (state) => ({
            ...state,
            isFetching: true,
        }),
    },
    {
        isFetching: false,
        feed: {
            news: [],
            show: [],
            ask: [],
            newest: [],
            jobs: [],
        },
        data: {
            comments: [],
        },
        user: {},
        error: null,
    }
);
