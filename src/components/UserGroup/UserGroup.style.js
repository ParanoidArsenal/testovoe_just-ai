import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    list: {
        background: theme.palette.primary.light,
        width: '60%',
        maxWidth: '400px',
        transition: 'all 0.1s',
    },
    listIten: {
        maxHeight: '116px',
        boxSizing: 'border-box',
    },
    wrap: {
        display: 'flex',
        flex: 1,
        height: 'inherit',
    },
}));