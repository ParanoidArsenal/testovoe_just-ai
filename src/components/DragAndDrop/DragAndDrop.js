import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalProvider, GlobalContext} from '../../globalState/globalState';
import { updateFavorites, updateDragAndDrop } from '../../globalState/actions/globalActions';

export const DragAndDrop = ({render, ...data}) => {
    const { state, dispatch } = useContext(GlobalContext);
    const onDragStart = (event) => {
        console.log(data);
        dispatch(updateDragAndDrop(data));
    };
    const onDrop = (event) => {
        dispatch(updateDragAndDrop(null));
    };
    const onDragOver = (event) => {
        event.preventDefault();
    };
    const draggable = true;
    return (
        render({onDragStart, onDrop, onDragOver, draggable})
    );
};