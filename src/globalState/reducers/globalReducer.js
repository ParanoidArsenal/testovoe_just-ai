
export const globalReducer = (state, action) => {
    switch(action.type){
        case 'SET_LOADING':
            return { ...state, loading: action.data };
        case 'SET_LIST':
            const list = action.data.sort((userA, userB) => (
                Date.parse(userB.registered.date) - Date.parse(userA.registered.date)
            ));
            return { ...state, list: list };
        case 'UPDATE_FAVORITES':
            return { ...state, favoritesList: action.data };
        case 'ADD_TO_FAVORITES':
            const newFavoritesList = state.favoritesList;
            if(action.position){
                newFavoritesList.push({...action.data, position: action.position})
                newFavoritesList.sort((a, b)=>(a.position - b.position))
            } else {
                newFavoritesList.push({...action.data, position: state.favoritesList.length + 1})
            }
            return { ...state, favoritesList: newFavoritesList }
        case 'REMOVE_FROM_FAVORITES':
            const favoritesListWithRemove = state.favoritesList.filter(user => user.mail !== action.data.mail);
            return { ...state, favoritesList: favoritesListWithRemove }
        case 'UPDATE_DRAG_AND_DROP':
            return { ...state, dragAndDrop: action.data }
        default: 
            return state;
    };
};