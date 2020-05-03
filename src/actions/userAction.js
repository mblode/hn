import { createActions } from 'redux-actions';
import HN from '../helpers/apiHN';

export const {
    loginUserSuccess,
    loginUserFailure,
    loginUserStarted,
    upvotePostSuccess,
    upvotePostFailure,
    upvotePostStarted,
} = createActions(
    {
        LOGIN_USER_SUCCESS: (data, username) => ({ data, username }),
        LOGIN_USER_FAILURE: (error) => ({ error }),
        UPVOTE_POST_SUCCESS: (data) => ({ data }),
        UPVOTE_POST_FAILURE: (error) => ({ error }),
    },
    'LOGIN_USER_STARTED',
    'UPVOTE_POST_STARTED'
);

export const loginUser = (username, password) => {
    return async (dispatch) => {
        dispatch(loginUserStarted());

        try {
            const response = await HN.login(username, password);
            dispatch(loginUserSuccess(response, username));
        } catch (error) {
            dispatch(loginUserFailure(error));
        }
    };
};

export const upvotePost = (id) => {
    return async (dispatch) => {
        dispatch(upvotePostStarted());

        try {
            const response = await HN.upvote(id);
            dispatch(upvotePostSuccess(response));
        } catch (error) {
            dispatch(upvotePostFailure(error));
        }
    };
};
