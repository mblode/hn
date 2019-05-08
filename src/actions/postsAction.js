import { createActions } from "redux-actions";

export const {
    fetchCommentsSuccess,
    fetchCommentsFailure,
    fetchCommentsStarted,
    fetchPostsNewsSuccess,
    fetchPostsShowSuccess,
    fetchPostsAskSuccess,
    fetchPostsNewestSuccess,
    fetchPostsJobsSuccess,
    fetchPostsFailure,
    fetchPostsStarted
} = createActions(
    {
        FETCH_COMMENTS_SUCCESS: data => ({ data }),
        FETCH_COMMENTS_FAILURE: error => ({ error }),
        FETCH_POSTS_NEWS_SUCCESS: data => ({ data }),
        FETCH_POSTS_SHOW_SUCCESS: data => ({ data }),
        FETCH_POSTS_ASK_SUCCESS: data => ({ data }),
        FETCH_POSTS_NEWEST_SUCCESS: data => ({ data }),
        FETCH_POSTS_JOBS_SUCCESS: data => ({ data }),
        FETCH_POSTS_FAILURE: error => ({ error })
    },
    "FETCH_COMMENTS_STARTED",
    "FETCH_POSTS_STARTED"
);

export const fetchComments = (id) => {
    return dispatch => {
        dispatch(fetchCommentsStarted());

        fetch(`https://node-hnapi.herokuapp.com/item/${id}`)
            .then(
                response => response.json(),
                error => dispatch(fetchCommentsFailure(error))
            )
            .then(data => {
                dispatch(fetchCommentsSuccess(data))
            })
    };
};

export const fetchPosts = (type, page) => {
    return dispatch => {
        dispatch(fetchPostsStarted());

        fetch(`https://node-hnapi.herokuapp.com/${type}?page=${page}`)
            .then(
                response => response.json(),
                error => dispatch(fetchPostsFailure(error))
            )
            .then(data => {
                console.log(type);
                if (type === "news") {
                    dispatch(fetchPostsNewsSuccess(data))
                } else if (type === "show") {
                    dispatch(fetchPostsShowSuccess(data))
                } else if (type === "ask") {
                    dispatch(fetchPostsAskSuccess(data))
                } else if (type === "Newest") {
                    dispatch(fetchPostsNewestSuccess(data))
                } else if (type === "jobs") {
                    dispatch(fetchPostsJobsSuccess(data))
                }
            })
    };
};
