import React, { useState, useEffect, useContext, useMemo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { UserCard } from '../UserCard/UserCard';
import { DragAndDrop } from '../DragAndDrop/DragAndDrop';
import {AutoSizer, List} from 'react-virtualized';

const HighlightedText = ({text, filter}) => {
    const reg = new RegExp(`(${filter})`, 'gi');
    const parts = text.split(reg);
    return (
        <span>
            {parts.map(part => (
                part.toLowerCase() === filter.toLowerCase()
                    ? <b>{part}</b>
                    : part
                )
            )}
        </span>);
};

export const UserGroup = ({usersInGroup=[], title = "", filter = ""}) => {
    console.log('here');
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const reg = new RegExp(`(${filter})`, 'gi');
    const usersToRender = useMemo(() => (
        usersInGroup.reduce((filteredUsers, user) => {
            const fullName = `${user.name.first} ${user.name.last}`;
            if(fullName.match(reg)){
                filteredUsers.push(
                    <DragAndDrop
                        image={user.picture.large}
                        date={user.registered.date}
                        fullName= {fullName}
                        mail={user.email}
                        render={props => (
                        <ListItem {...props}>
                            <UserCard
                                image={user.picture.large}
                                date={user.registered.date}
                                fullName= {
                                    <HighlightedText text={fullName} filter={filter}/>
                                }
                                mail={user.email}/>
                            </ListItem>
                        )}/>
                )}
            return filteredUsers;
        }, [])
    ), [usersInGroup, filter]);
    const disabled = !usersToRender.length;
return (
    <>
        <ListItem button onClick={handleClick} disabled={disabled}>
            <ListItemText primary={title} />
            {open && !disabled ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open && !disabled} timeout="auto" unmountOnExit>
            <List component="nav">
                {
                    usersToRender.map(user => (
                        <>
                            {user}
                        </>
                    ))
                }
            </List>
        </Collapse>
    </>
);
};