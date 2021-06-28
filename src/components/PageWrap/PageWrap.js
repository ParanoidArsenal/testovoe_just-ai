import React, { useContext } from 'react';
import { useStyles } from './PageWrap.style';
import { Spinner } from '../Spinner/Spinner';
import { GlobalProvider, GlobalContext} from '../../globalState/globalState';

export const PageWrap = ({children}) => {
    const classes = useStyles();
    const { state, dispatch } = useContext(GlobalContext);
    return (
        <div className={classes.root}>
            {state.loading &&
                <Spinner/>
            }
            {children}
        </div>
    );
};