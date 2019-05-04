import { createActions } from "redux-actions";
import clientApi from "../helpers/clientApi";
import flattenComment from "../helpers/flattenComment";

export const {
    fetchCommentsSuccess,
    fetchCommentsFailure,
    fetchCommentsStarted,
    fetchPostsSuccess,
    fetchPostsFailure,
    fetchPostsStarted
} = createActions(
    {
        FETCH_COMMENTS_SUCCESS: (data) => ({ data }),
        FETCH_COMMENTS_FAILURE: error => ({ error }),
        FETCH_POSTS_SUCCESS: (type, page, data) => ({ type, page, data }),
        FETCH_POSTS_FAILURE: error => ({ error })
    },
    "FETCH_COMMENTS_STARTED",
    "FETCH_POSTS_STARTED"
);

export const fetchComments = (id) => {
    return dispatch => {
        dispatch(fetchCommentsStarted());

        clientApi.get(`item/${id}`)
            .then(
                response => response.json(),
                error => dispatch(fetchCommentsFailure(error))
            )
            .then(data => {
                dispatch(fetchCommentsSuccess({
                    ...data,
                    timeAgo: data.time_ago,
                    comments: flattenComment(data).map(v => ({ ...v, timeAgo: v.time_ago })),
                }))
            })
    };
};

export const fetchPosts = (type, page) => {
    return dispatch => {
        dispatch(fetchPostsStarted());

        clientApi.get(`${type}?page=${page}`)
            .then(
                response => response.json(),
                error => dispatch(fetchPostsFailure(error))
            )
            .then(data => data.map((v) => {
                const { comments_count: commentsCount, time_ago: timeAgo, ...rest } = v;
                return { ...rest, commentsCount, timeAgo };
            }))
            .then(data => {
                dispatch(fetchPostsSuccess(type, page, data))
            })
    };
};
