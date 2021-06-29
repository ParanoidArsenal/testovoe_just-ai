import React, { useState, useMemo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { UserCard } from '../UserCard/UserCard';
import { DragAndDrop } from '../DragAndDrop/DragAndDrop';
import {AutoSizer, List} from 'react-virtualized';
import {useStyles} from './UserGroup.style';

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

export const UserGroup = ({usersInGroup=[], title = "", filter = "", containerHeight=0}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    const renderRow = ({ index, key, style }) => (
        <DragAndDrop
            image={usersToRender[index].image}
            date={usersToRender[index].date}
            fullName= {usersToRender[index].fullName}
            mail={usersToRender[index].mail}
            render={props => (
            <ListItem {...props} key={key} className={classes.listIten} style={{...style, padding: '0', cursor: 'grab'}}>
                <UserCard
                    image={usersToRender[index].image}
                    date={usersToRender[index].date}
                    fullName= {
                        <HighlightedText text={usersToRender[index].fullName} filter={filter}/>
                    }
                    mail={usersToRender[index].mail}/>
                </ListItem>
            )}/>
    )

    const reg = new RegExp(`(${filter})`, 'gi');
    const usersToRender = useMemo(() => (
        usersInGroup.reduce((filteredUsers, user) => {
            const fullName = `${user.name.first} ${user.name.last}`;
            if(fullName.match(reg)){
                filteredUsers.push(
                    {   image: user.picture.large,
                        date: user.registered.date,
                        fullName: fullName,
                        mail: user.email,
                    }
                )}
            return filteredUsers;
        }, [])
    ), [usersInGroup, filter]);
    const disabled = !usersToRender.length;
    const maxHeight = `${usersToRender.length * 116}px`;
    return (
        <>
            <ListItem button onClick={handleClick} disabled={disabled}>
                <ListItemText primary={title} />
                {open && !disabled ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <div style={open && !disabled ?{maxHeight: maxHeight}:{display: 'none', maxHeight: maxHeight}} className={classes.wrap}>
            <AutoSizer>
                {({height, width}) => (
                        <List
                            height={height}
                            rowCount={usersToRender.length}
                            rowHeight={116}
                            rowRenderer={renderRow}
                            width={368}
                            overscanRowCount={3}
                            measureAllRows
                            estimatedRowSize={464}
                        />
                )}
            </AutoSizer>
            </div>
        </>
    );
};