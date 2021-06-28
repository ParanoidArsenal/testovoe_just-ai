import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    wrap: {
        width: '100%',
        borderRadius: '8px',
        boxSizing: 'border-box',
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100px',
        opacity:'0.3',
        backgroundColor: theme.palette.primary.light,
        border: `2px dashed ${theme.palette.primary.dark}`,
    },
}));