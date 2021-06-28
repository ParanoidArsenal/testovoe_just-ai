import React, { useState, useEffect, useContext } from 'react';
import { GlobalProvider, GlobalContext} from '../../globalState/globalState';
import { loadList } from '../../globalState/actions/globalActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { UserGroup } from '../UserGroup/UserGroup';
import { useStyles } from './UserList.style';
import Box from '@material-ui/core/Box';

export const getUserGroups = (users = []) => {
    if(!users.length){
        return [];
    }
    let userGroups = [];
    // const userGroupsCount = Math.ceil(users.length/10);
    // for (let i = 0; i < userGroupsCount; i++) {
    //     userGroups.push(users.slice(i*10, i*10+10));
    // }
    users.forEach(user =>{
        const groupNumber = Math.floor(user.registered.age/10);
        if(userGroups[groupNumber]){
            userGroups[groupNumber].push(user);
        } else {
            userGroups[groupNumber] = [user];
        }
    });
    return userGroups;
};

export const UserList = ({filter = ""}) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);
    const [userGroups, setUserGroups] = useState([]);
    useEffect(()=>(
        // loadList(dispatch)
        setUserGroups(getUserGroups(state.list))
    ), [state.list]);
    // const userGroups = getUserGroups(state.list);
    return (
        <Box boxShadow={3} className={classes.list}>
            <List component="nav">            
                {
                    userGroups.map((userGroup=[], i) => (
                        <UserGroup filter={filter} usersInGroup={userGroup} title={`${i*10+1}-${i*10+10}`}/>
                    ))
                }
            </List>
        </Box>
    );
};