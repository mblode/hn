import { handleActions } from "redux-actions";

export default handleActions(
    {
        // FETCH_POSTS_NEWS_SUCCESS: (state, action) => ({
        //     ...state,
        //     isFetching: false,
        //     news: action.payload.data,
        //     error: action.payload.error
        // }),
        // FETCH_POSTS_SHOW_SUCCESS: (state, action) => ({
        //     ...state,
        //     isFetching: false,
        //     show: action.payload.data
        // }),
        // FETCH_POSTS_ASK_SUCCESS: (state, action) => ({
        //     ...state,
        //     isFetching: false,
        //     ask: action.payload.data
        // }),
        // FETCH_POSTS_NEWEST_SUCCESS: (state, action) => ({
        //     ...state,
        //     isFetching: false,
        //     newest: action.payload.data
        // }),
        // FETCH_POSTS_JOBS_SUCCESS: (state, action) => ({
        //     ...state,
        //     isFetching: false,
        //     jobs: action.payload.data
        // }),
        FETCH_POSTS_FAILURE: (state, action) => ({
            ...state,
            isFetching: false,
            error: action.payload.error
        }),
        FETCH_POSTS_STARTED: (state) => ({
            ...state,
            isFetching: true
        }),
        FETCH_COMMENTS_SUCCESS: (state, action) => ({
            ...state,
            isFetching: false,
            data: action.payload.data
        }),
        FETCH_COMMENTS_FAILURE: (state, action) => ({
            ...state,
            isFetching: false,
            error: action.payload.error
        }),
        FETCH_COMMENTS_STARTED: (state) => ({
            ...state,
            isFetching: true
        })
    },
    {
        isFetching: false,
        news: [],
        show: [],
        ask: [],
        newest: [],
        jobs: [],
        data: {
            comments: []
        },
        error: null,
    }
);
