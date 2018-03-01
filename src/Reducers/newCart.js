export const actionAddStrollType = {
    ALL_STROLL:"ALL_STROLL",
    ALL_COMMENTS: "ALL_COMMENTS",
    ALL_FAVORITES: "ALL_FAVORITES",
};

const defaultState = {
    allStroll: [],
    allComments: [],
    allFavorites: [],
};

export default function addStroll(state = defaultState, action) {
    switch (action.type) {
        case "ALL_STROLL":
            return{...state, allStroll:action.payload};
            break;
        case "ALL_COMMENTS":
            return{...state, allComments:action.payload};
            break;
        case "ALL_FAVORITES":
            return{...state, allFavorites:action.payload};
            break;
        default:
            return state;
    }
}