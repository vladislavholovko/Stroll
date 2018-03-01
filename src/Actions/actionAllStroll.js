import {store} from "../Components/App";
import {actionAddStrollType} from '../Reducers/newCart';

export function allStroll() {
    fetch("http://localhost:3001/createStroll")
        .then(response => response.json())
        .then(data => {
            store.dispatch({
                type: actionAddStrollType.ALL_STROLL,
                payload: data
            });
        });

}

export function allComments() {
    fetch("http://localhost:3001/comments")
        .then(response => response.json())
        .then(data => {
            store.dispatch({
                type: actionAddStrollType.ALL_COMMENTS,
                payload: data
            });

        });
}

export function allFavorites() {

    fetch("http://localhost:3001/favorites")
        .then(response => response.json())
        .then(data => {
            store.dispatch({
                type: actionAddStrollType.ALL_FAVORITES,
                payload: data
            });
        });

}
