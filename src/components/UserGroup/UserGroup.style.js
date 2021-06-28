import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    list: {
        background: theme.palette.primary.light,
        width: '60%',
        maxWidth: '500px',
        transition: 'all 0.1s',
    },
}));