import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        background: 'white',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '30px',
        paddingBottom: '30px',
        boxSizing: 'border-box',
    },
}));