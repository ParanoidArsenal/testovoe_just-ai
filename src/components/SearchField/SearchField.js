import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './SearchField.style';

export const SearchField = ({searchValue, setSearchValue}) => {
    const handleChange = (e) => setSearchValue(e.target.value);
    const classes = useStyles();
    return (
        <TextField
            className={classes.textField}
            value={searchValue}
            onChange={handleChange}
            variant="outlined"
            placeholder="Поиск"
            InputProps={{
                className: classes.input,
            }}
        />
    );
};