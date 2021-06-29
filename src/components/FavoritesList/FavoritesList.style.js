import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    head: {
        width: '100%',
        padding: '12px 0',
        maxWidth: '400px',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
    },
    list: {
        marginTop: 30,
        padding: '20px 15px',
        width: '100%',
        maxWidth: '400px',
        borderRadius: 8,
        height: '100%',
        overflowY: 'auto',
        boxSizing: 'border-box',
    },
    wrap: {
        marginRight: 5,
        width: '100%',
        maxWidth: '400px',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        minHeight: '116px',
        boxSizing: 'border-box',
    },
}));