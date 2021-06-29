import React, { useState, useEffect, useContext, useRef } from 'react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useStyles } from './FavoritesList.style';
import { UserCard } from '../UserCard/UserCard';
import List from '@material-ui/core/List';
import { GlobalContext} from '../../globalState/globalState';
import { updateFavorites, addToFavorites, removeFromFavorites } from '../../globalState/actions/globalActions';
import { DragableItem } from './DragableItem/DragableItem';

export const FavoritesList = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);
    const [listToRender, setListToRender] = useState(state.favoritesList);
    const draggedItem = useRef({showCount: 0, showAreaToDrop: false});

    useEffect(() => {
        const {showcount, showAreaToDrop} = draggedItem.current;
        if(!showcount && showAreaToDrop){
            setListToRender(state.favoritesList);
            draggedItem.current.showAreaToDrop = false;
        } 
    }, [draggedItem.current.showcount, state.favoritesList]);

    useEffect(() => {
        setListToRender(state.favoritesList);
    }, [state.favoritesList]);

    const onDragEnter = (event) => {
        event.preventDefault();
        if(!state.dragAndDrop.isListItemDragged ){
            const { showCount, showAreaToDrop} = draggedItem.current;
            draggedItem.current.showcount = showCount + 1;
            if(!showAreaToDrop){
                setListToRender([...listToRender, {isPlaceToDrop: true, position: listToRender.length+1}])
                draggedItem.current.showAreaToDrop = true;
            }
        }
    }

    const onDragLeave = (event) => {
        event.preventDefault();
        if(!state.dragAndDrop.isListItemDragged && draggedItem.current.showcount){
            draggedItem.current.showcount = draggedItem.current.showcount - 1;
        }
    };

    const onDrop = (event) => {
        if(!state.dragAndDrop.isListItemDragged){
            draggedItem.current.showcount = 0;
            const dragAndDrop = state.dragAndDrop;
            if(!state.favoritesList.find(user => user.mail === dragAndDrop.mail)){
                const newFavoritesList = listToRender.map(item => {
                    if(!item.isPlaceToDrop){
                        const {isPlaceToDrop, ...itemData} = item;
                        return itemData;
                    } else {
                        const { position } = item;
                        return { position, ...dragAndDrop };
                    }
                });
                dispatch(updateFavorites(newFavoritesList));
            }
        }
        event.preventDefault();
    };

    const handleRemove = (user) => {
        dispatch(removeFromFavorites(user));
    };

    return (
        <div className={classes.wrap}>
            <Box boxShadow={3} className={classes.head}>
                <Typography variant="h5" gutterBottom>
                    Избранное
                </Typography>
            </Box>
            <Box
                boxShadow={3}
                className={classes.list}
                onDragEnter={onDragEnter}
                onDragOver={e => { e.preventDefault()}}
                onDragLeave={onDragLeave}
                onDrop={onDrop}>
                <List component="nav" style={{['pointer-events']: 'none'}}>
                    {
                        listToRender.map(item => (
                                <DragableItem
                                    item={item}
                                    list={listToRender}
                                    updateList={setListToRender}
                                    onDragEnterList={onDragEnter}
                                    render={props => (
                                    <UserCard
                                        image={item.image}
                                        date={item.date}
                                        fullName= {item.fullName}
                                        mail={item.mail}
                                        dataPosition={item.position}
                                        removeable
                                        remove={()=> handleRemove(item)}
                                        isDropArea={item.isPlaceToDrop}
                                        {...props}
                                        />)}/>
                        ))
                    } 
                </List>
            </Box>
        </div>
    );
};