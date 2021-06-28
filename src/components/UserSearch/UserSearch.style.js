import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    search_wrap: {
        marginRight: 15,
        width: '50%',
        maxWidth: '400px',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
    },
    container: {
        padding: 15,
        width: '85%',
        maxWidth: '1000px',
        height: '100%',
        boxSizing: 'border-box',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
}));