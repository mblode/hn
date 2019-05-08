import { createActions } from "redux-actions";
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Dispatch } from "react";

interface State {
    // something: string;
}

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

export const fetchComments = (id: string) => {
    return async (dispatch: ThunkDispatch<State, undefined, Action>) => {
        dispatch(fetchCommentsStarted());

        try {
            const result = await fetch(`https://node-hnapi.herokuapp.com/item/${id}`)
                .then(
                    response => response.json(),
                    error => dispatch(fetchCommentsFailure(error))
                )
                .then(data => {
                    dispatch(fetchCommentsSuccess(data))
                })
        } catch (err) {
            console.error(err);
        }

    };
};

export const fetchPosts = (pageType: string, page: string) => {
    return async (dispatch: ThunkDispatch<State, undefined, Action>) => {
        dispatch(fetchPostsStarted());

        try {
            const result = await fetch(`https://node-hnapi.herokuapp.com/${pageType}?page=${page}`)
                .then(
                    response => response.json(),
                    error => dispatch(fetchPostsFailure(error))
                )
                .then(data => {
                    if (pageType === "news") {
                        dispatch(fetchPostsNewsSuccess(data))
                    } else if (pageType === "show") {
                        dispatch(fetchPostsShowSuccess(data))
                    } else if (pageType === "ask") {
                        dispatch(fetchPostsAskSuccess(data))
                    } else if (pageType === "newest") {
                        dispatch(fetchPostsNewestSuccess(data))
                    } else if (pageType === "jobs") {
                        dispatch(fetchPostsJobsSuccess(data))
                    }
                })
        } catch (err) {
            console.error(err);
        }
    };
};
