import {store} from "../Components/App";
import {actionAddStrollType} from '../Reducers/newCart';

export async function allStroll() {
    let response = await fetch("http://localhost:3001/createStroll");
    let data = await response.json();
    store.dispatch({
        type: actionAddStrollType.ALL_STROLL,
        payload: data
    });
}

export async function allComments() {
    let response = await fetch("http://localhost:3001/comments");
    let data = await response.json();
    store.dispatch({
        type: actionAddStrollType.ALL_COMMENTS,
        payload: data
    });
}

export async function allFavorites() {
    let response = await fetch("http://localhost:3001/favorites");
    let data = await response.json();

            store.dispatch({
                type: actionAddStrollType.ALL_FAVORITES,
                payload: data
            });
   }

export async function allCategory() {
        let response = await fetch("http://localhost:3001/category");
        let data = await response.json();

        store.dispatch({
            type: actionAddStrollType.ALL_CATEGORY,
            payload: data
        });
}

export async function allUser() {
    let response = await fetch("http://localhost:3001/users");
    let data = await response.json();

    store.dispatch({
        type: actionAddStrollType.ALL_USER,
        payload: data
    });
}
