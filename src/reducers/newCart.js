export const actionAddStrollType = {
    ADD_NAME:"ADD_NAME",
    ADD_CATEGORY: "ADD_CATEGORY",
    ADD_MARKERS: "ADD_MARKERS",
    ADD_LENGTH: "ADD_LENGTH",
    ADD_DESCRIPTION: "ADD_DESCRIPTION",
    ADD_USER: "ADD_USER",
    ADD_ID: "ADD_ID"
};

const defaultState = {
    name: "",
    category: "",
    markers: [],
    length: "",
    description: "",
    user: "",
    id:""
};

export default function addStroll(state = defaultState, action) {
    switch (action.type) {
        case "ADD_NAME":
            return{...state, name:action.payload};
            break;
        default:
            return state;
    }
}