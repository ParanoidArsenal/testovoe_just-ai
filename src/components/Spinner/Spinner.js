import { useStyles } from './Spinner.style';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Spinner = () => {
    const classes = useStyles();
    return (
        <div className={classes.spinnerWrap}>
            <CircularProgress className={classes.spinner}/>
        </div>
    );
}