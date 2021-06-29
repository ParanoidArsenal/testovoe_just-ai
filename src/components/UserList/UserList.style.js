import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    list: {
        marginTop: 30,
        width: '100%',
        maxWidth: '400px',
        borderRadius: 8,
        // height: 'min-content',
        height:'100%',
        overflowY: 'auto',
        display:'flex',
        flexDirection: 'column',
    },
}));