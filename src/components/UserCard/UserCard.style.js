import { makeStyles } from '@material-ui/core/styles';

export const styles = ((theme) => ({
    wrap: {
        width: '100%',
        boxShadow: 'none',
    },
    root: {
        width: '100%',
        borderRadius: '8px',
        boxSizing: 'border-box',
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100px',
    },
    cover: {
        display: 'flex',
        margin: '30px 0',
        width: '25%',
        height: '100%',
        boxSizing: 'border-box',
        minWidth: '30px',
        borderRadius: '4px',
    },
    content: {
        display: 'flex',
        width: '65%',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '10px',
        "& > *": {
            margin: '5px 0',
            textOverflow: 'ellipsis',
        },
    },
    actionBlock: {
        width: '10%',
        padding: '0',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        fontSize: '1.9rem',
        padding: '5px',
        transition: 'all 0.1s',
        "&:hover": {
            opacity: '0.5',
        }
    },
    
}));