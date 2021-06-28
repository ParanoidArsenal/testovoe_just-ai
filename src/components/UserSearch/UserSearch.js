import React, { useState, useEffect, useContext } from 'react';
import { GlobalProvider, GlobalContext} from '../../globalState/globalState';
import { loadList } from '../../globalState/actions/globalActions';
import { SearchField } from '../SearchField/SearchField';
import { useStyles } from './UserSearch.style';
import { UserList } from '../UserList/UserList';
import { classExpression } from '@babel/types';
import { Paper } from '@material-ui/core';
import { FavoritesList }  from '../FavoritesList/FavoritesList';

export const UserSearch = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);
    useEffect(()=>(
        loadList(dispatch)
    ), []);
    const [searchValue, setSearchValue] = useState('');
    return (
        <Paper elevation={3} className={classes.container}>
            <div className={classes.search_wrap}>
                <SearchField
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}/>
                <UserList filter={searchValue}/>
            </div>
            <FavoritesList/>
        </Paper>
    );
};