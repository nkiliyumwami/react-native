import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
            //Week 2 Assign Task 3: Adding a new comment: And add an id to the object(comment)
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload
            comment.id = state.comments.length
            return {...state, comments: state.comments.concat(comment)};

        default:
            return state;
    }
};