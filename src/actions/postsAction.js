import { createActions } from 'redux-actions';
import axios from 'axios';

export const {
    fetchCommentsSuccess,
    fetchCommentsFailure,
    fetchCommentsStarted,
    fetchFeedSuccess,
    fetchFeedFailure,
    fetchFeedStarted,
    fetchUserSuccess,
    fetchUserFailure,
    fetchUserStarted,
} = createActions(
    {
        FETCH_COMMENTS_SUCCESS: (data) => ({ data }),
        FETCH_COMMENTS_FAILURE: (error) => ({ error }),
        FETCH_FEED_SUCCESS: (data, type) => ({ data, type }),
        FETCH_FEED_FAILURE: (error) => ({ error }),
        FETCH_USER_SUCCESS: (user) => ({ user }),
        FETCH_USER_FAILURE: (error) => ({ error }),
    },
    'FETCH_COMMENTS_STARTED',
    'FETCH_FEED_STARTED',
    'FETCH_USER_STARTED'
);

export const fetchComments = (id) => {
    return async (dispatch) => {
        dispatch(fetchCommentsStarted());

        try {
            const response = await axios.get(`https://api.hackerwebapp.com/item/${id}`);
            dispatch(fetchCommentsSuccess(response.data));
        } catch (error) {
            dispatch(fetchCommentsFailure(error));
        }
    };
};

export const fetchFeed = (type, page) => {
    return async (dispatch) => {
        dispatch(fetchFeedStarted());

        try {
            const response = await axios.get(`https://api.hackerwebapp.com/${type}?page=${page}`);
            dispatch(fetchFeedSuccess(response.data, type));
        } catch (error) {
            dispatch(fetchFeedFailure(error));
        }
    };
};

export const fetchUser = (id) => {
    return async (dispatch) => {
        dispatch(fetchUserStarted());

        try {
            const response = await axios.get(`https://api.hackerwebapp.com/user/${id}`);
            dispatch(fetchUserSuccess(response.data));
        } catch (error) {
            dispatch(fetchUserFailure(error));
        }
    };
};
