import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    progress: {
        position: 'absolute',
        left: '50%',
        // top: '50%',
        // transform: 'translate(-50%,-50%)',
        zIndex: '1000',
    },
}));