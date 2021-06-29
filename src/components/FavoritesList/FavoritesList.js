import React, { useState, useEffect, useContext, useRef } from 'react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useStyles } from './FavoritesList.style';
import { UserCard } from '../UserCard/UserCard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { GlobalProvider, GlobalContext} from '../../globalState/globalState';
import { UserGroup } from '../UserGroup/UserGroup';
import { PlaceToDrop } from './PlaceToDrop/PlaceToDrop';
import { updateFavorites, addToFavorites, removeFromFavorites } from '../../globalState/actions/globalActions';
import { DragableItem } from './DragableItem/DragableItem';

const updateListToRender = (list=[], showPlaceToDrop=false, positionToDrop=0) => {
    if(!showPlaceToDrop){
        return list;
    }
    else if(positionToDrop){
        const newList = [...list, { isPlaceToDrop: true, position: positionToDrop}];
        return newList.sort((a, b)=>(a.position - b.position))
    }
    return [...list, { position: (list.length + 1), isPlaceToDrop: true }];
};

export const FavoritesList = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);
    const [placeToDrop, setPlaceToDrop] = useState({showCount: 0});
    const [listToRender, setListToRender] = useState(state.favoritesList);
    const draggedItem = useRef({showCount: 0, showAreaToDrop: false});

    // useEffect(() => {
    //     const newListToRender = updateListToRender(state.favoritesList, placeToDrop.showCount, placeToDrop.position);
    //     setListToRender(newListToRender);
    // }, [state.favoritesList, placeToDrop.showCount, placeToDrop.position]);

    useEffect(() => {
        const {showcount, showAreaToDrop} = draggedItem.current;
        if(!showcount && showAreaToDrop){
            // const newListToRender = listToRender.filter(item => !item.isPlaceToDrop);
            // setListToRender(newListToRender);
            setListToRender(state.favoritesList);
            draggedItem.current.showAreaToDrop = false;
        } 
    }, [draggedItem.current.showcount, state.favoritesList]);

    useEffect(() => {
        setListToRender(state.favoritesList);
    }, [state.favoritesList]);

    // const newListToRender = updateListToRender(state.favoritesList, placeToDrop.showCount, placeToDrop.position);

    const onDragEnter = (event) => {
        event.preventDefault();
        // if(!placeToDrop || !placeToDrop.showCount){
        if(!state.dragAndDrop.isListItemDragged ){
            // const { showCount } = placeToDrop;
            const { showCount, showAreaToDrop} = draggedItem.current;
            draggedItem.current.showcount = showCount + 1;
            if(!showAreaToDrop){
                setListToRender([...listToRender, {isPlaceToDrop: true, position: listToRender.length+1}])
                // dispatch(updateDragAndDrop({...state.dragAndDrop, placeToDropPosition: listToRender.length+1}));
                draggedItem.current.showAreaToDrop = true;
            }
            // setPlaceToDrop({showCount:showCount + 1});
        }
        // }
    }

    const onDragLeave = (event) => {
        event.preventDefault();
        // if(placeToDrop && placeToDrop.showCount){
            // const { showCount } = placeToDrop;
            // setPlaceToDrop({showCount:showCount - 1});
    
        if(!state.dragAndDrop.isListItemDragged && draggedItem.current.showcount){
            draggedItem.current.showcount = draggedItem.current.showcount - 1;
        }
    };

    const onDrop = (event) => {
        if(!state.dragAndDrop.isListItemDragged){
            // if(placeToDrop && placeToDrop.showCount){
                // setPlaceToDrop({showCount:0});
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
                // dispatch(addToFavorites(dragAndDrop, position));
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
                            // !item.isPlaceToDrop
                            // ?
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
                            // :
                            // <PlaceToDrop dataPosition={item.position}/>
                        ))
                    } 
                </List>
            </Box>
        </div>
    );
};