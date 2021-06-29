import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext} from '../../globalState/globalState';
import { UserGroup } from '../UserGroup/UserGroup';
import { useStyles } from './UserList.style';
import Box from '@material-ui/core/Box';

export const getUserGroups = (users = []) => {
    if(!users.length){
        return [];
    }
    let userGroups = [];
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
        setUserGroups(getUserGroups(state.list))
    ), [state.list]);

    return (
        <Box boxShadow={3} className={classes.list}>
                {
                    userGroups.map((userGroup=[], i) => (
                        <UserGroup
                            filter={filter}
                            usersInGroup={userGroup} 
                            title={`${i*10+1}-${i*10+10}`}/>
                    ))
                }
        </Box>
    );
};