import React, { useContext } from 'react';
import { GlobalContext} from '../../globalState/globalState';
import { updateDragAndDrop } from '../../globalState/actions/globalActions';

export const DragAndDrop = ({render, ...data}) => {
    const { state, dispatch } = useContext(GlobalContext);
    const onDragStart = (event) => {
        dispatch(updateDragAndDrop(data));
    };
    const onDragEnd = (event) => {
        dispatch(updateDragAndDrop(null));
    };
    const onDragOver = (event) => {
        event.preventDefault();
    };
    const draggable = true;
    return (
        render({onDragStart, onDragEnd, onDragOver, draggable})
    );
};