import { handleActions } from "redux-actions";

export default handleActions(
    {
        FETCH_POSTS_SUCCESS: (state, action) => ({
            ...state,
            isFetching: false,
            type: action.payload.type,
            page: action.payload.page,
            data: action.payload.data
        }),
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
            product: action.payload.product
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
        type: null,
        page: 0,
        data: {},
        // ask: {},
        // jobs: {},
        // newest: {},
        // news: {},
        // show: {},
        error: null,
    }
);
