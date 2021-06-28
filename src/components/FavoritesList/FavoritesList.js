import React, { useState, useEffect, useContext } from 'react';
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

    const newListToRender = updateListToRender(state.favoritesList, placeToDrop.showCount, placeToDrop.position);

    const onDragEnter = (event, place) => {
        event.preventDefault();
        // if(!placeToDrop || !placeToDrop.showCount){
            const { showCount } = placeToDrop;
            console.log('onDragEnter', place, showCount, event.target);
            setPlaceToDrop({showCount:showCount + 1});
        // }
    }

    const onDragLeave = (event, place) => {
        event.preventDefault();
        if(placeToDrop && placeToDrop.showCount){
            const { showCount } = placeToDrop;
            setPlaceToDrop({showCount:showCount - 1});
            console.log('onDragLeave', place, showCount, event.target);
        }
    };

    const onDrop = (event) => {
        if(placeToDrop && placeToDrop.showCount){
            setPlaceToDrop({showCount:0});
        }
        const dragAndDrop = state.dragAndDrop;
        if(!state.favoritesList.find(user => user.mail === dragAndDrop.mail)){
            dispatch(addToFavorites(dragAndDrop));
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
                onDragEnter={(e)=>onDragEnter(e, 'main box')}
                onDragOver={e => { e.preventDefault()}}
                onDragLeave={(e)=>onDragLeave(e, 'main box')}
                onDrop={onDrop}>
                <List component="nav" style={{['pointer-events']: 'none'}}>
                    {
                        newListToRender.map(item => (
                            !item.isPlaceToDrop
                            ? 
                                <UserCard
                                    image={item.image}
                                    date={item.date}
                                    fullName= {item.fullName}
                                    mail={item.mail}
                                    dataPosition={item.position}
                                    removeable
                                    remove={()=> handleRemove(item)}
                                    onDragEnter={(e)=>onDragEnter(e, 'sdasdasdas')}
                                    onDragOver={e => { e.preventDefault()}}
                                    />
                            :
                            <PlaceToDrop dataPosition={item.position}/>
                        ))
                    } 
                </List>
            </Box>
        </div>
    );
};