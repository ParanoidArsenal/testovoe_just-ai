import React, { useContext } from 'react';
import { GlobalContext} from '../../../globalState/globalState';
import { updateFavorites, updateDragAndDrop, removeFromFavorites } from '../../../globalState/actions/globalActions';

export const DragableItem = ({render, item, list, updateList, onDragEnterList}) => {
    const { state, dispatch } = useContext(GlobalContext);

    const onDragStart = (event) => {
        dispatch(updateDragAndDrop(
            {
                originalList: list,
                draggedItem: item,
                isListItemDragged: true,
                placeToDropPosition: item.position,
                originalPosition: item.position,
            }
        ));
        event.dataTransfer.setData("text/html", '');
    };

    const onDragEnd = (event) => {
        event.preventDefault();
        const {originalList, draggedItem, placeToDropPosition, isListItemDragged} = state.dragAndDrop;
        if(isListItemDragged){
            const itemToSwap = originalList[placeToDropPosition-1];
            const newList = originalList.map((item, i)=>{
                if(item.position === placeToDropPosition){
                    return {...draggedItem, position: i+1, isPlaceToDrop: false}
                } else if(item.position === draggedItem.position){
                    return {...itemToSwap, position: i+1, isPlaceToDrop: false}
                }
                return {...item, position: i+1, isPlaceToDrop: false}
            });
            dispatch(updateDragAndDrop(null));
            updateList(newList);
            dispatch(updateFavorites(newList));
        }
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDragEnter = (event) => {
        event.preventDefault();
        const { isListItemDragged } = state.dragAndDrop;
        onDragEnterList(event);
        if(item.isPlaceToDrop){
            return
        }
        if(isListItemDragged){
            dispatch(updateDragAndDrop(
                {
                    ...state.dragAndDrop,
                    placeToDropPosition: item.position,
                }
            ));
            const newList = list.map((listItem, i)=>(
                item.mail !== listItem.mail
                ? {...listItem, isPlaceToDrop: false}
                : {...listItem, isPlaceToDrop: true}
            ));
            updateList(newList);
        } else{
            let position = item.position;
            let { position: oldPosition } = list.find(item => item.isPlaceToDrop);
            let bufList = position <= oldPosition 
                ? [
                    ...list.slice(0, position-1),
                    {isPlaceToDrop: true },
                    ...list.slice(position-1)
                    ]
                : [
                    ...list.slice(0, position),
                    {isPlaceToDrop: true },
                    ...list.slice(position)
                    ]
            bufList = position <= oldPosition 
            ? bufList.filter((listItem, i) => !(listItem.isPlaceToDrop && i != position-1))
            : bufList.filter((listItem, i) => !(listItem.isPlaceToDrop && i != position))
            const newList = bufList.map((item, i) => ({...item, position: i + 1}))
            updateList(newList);
        }
    }
    const draggable = true;

    return (
        render({onDragStart, onDragEnd, onDragEnter, onDragOver, draggable})
    );
};