import axios from 'axios';

export const setLoading = (status) => {
    return {
        type: 'SET_LOADING',
        data: status,
    };
};

export const loadList = (dispatch) => {
    dispatch(setLoading(true));
    axios({
        method: 'get',
        url: `https://randomuser.me/api/?results=5000`,
      })
    .then((response) => {
        dispatch({
            type: 'SET_LIST',
            data: response.data.results,
        });
        dispatch(setLoading(false));
    })
    .catch((error) => {
        console.log(error)
        dispatch(setLoading(false));
    });
};

export const addToFavorites = (item, position) => {
    return {
        type: 'ADD_TO_FAVORITES',
        data: item,
        position: position,
    };
};

export const removeFromFavorites = (item) => {
    return {
        type: 'REMOVE_FROM_FAVORITES',
        data: item,
    };
};

export const updateFavorites = (list) => {
    return {
        type: 'UPDATE_FAVORITES',
        data: list,
    };
};

export const updateDragAndDrop = (item) => {
    return {
        type: 'UPDATE_DRAG_AND_DROP',
        data: item,
    };
};