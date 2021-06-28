import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    spinner: {
        left: 'calc(50% - 20px)',
        top: 'calc(50% - 20px)',
        position: 'fixed',
    },
    spinnerWrap: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: '1000',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
}));