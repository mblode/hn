import { createActions } from "redux-actions";

export const {
    fetchCommentsSuccess,
    fetchCommentsFailure,
    fetchCommentsStarted,
    fetchFeedSuccess,
    fetchFeedFailure,
    fetchFeedStarted,
} = createActions(
    {
        FETCH_COMMENTS_SUCCESS: data => ({ data }),
        FETCH_COMMENTS_FAILURE: error => ({ error }),
        FETCH_FEED_SUCCESS: (data, type) => ({ data, type }),
        FETCH_POSTS_FAILURE: error => ({ error })
    },
    "FETCH_COMMENTS_STARTED",
    "FETCH_FEED_STARTED"
);

export const fetchComments = (id) => {
    return dispatch => {
        dispatch(fetchCommentsStarted());

        fetch(`https://api.hackerwebapp.com/item/${id}`)
            .then(
                response => response.json(),
                error => dispatch(fetchCommentsFailure(error))
            )
            .then(data => {
                dispatch(fetchCommentsSuccess(data))
            })
    };
};

export const fetchFeed = (type, page) => {
    return dispatch => {
        dispatch(fetchFeedStarted());

        fetch(`https://api.hackerwebapp.com/${type}?page=${page}`)
            .then(
                response => response.json(),
                error => dispatch(fetchFeedFailure(error))
            )
            .then(data => {
                dispatch(fetchFeedSuccess(data, type))
            })
    };
};
