import React, { createContext, useReducer } from 'react';
import { globalReducer } from './reducers/globalReducer';

const initialState = {
    loading: false,
    list: [],
    favoritesList: [],
    dragAndDrop: null,
};

export const GlobalContext = createContext({
    state: initialState,
    dispatch: ()=>{},
});

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    return(
        <GlobalContext.Provider value={{state, dispatch}} >
            { children }
        </GlobalContext.Provider>
    );
};