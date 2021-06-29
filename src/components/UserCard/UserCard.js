import React from 'react';
import { styles } from './UserCard.style';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const getFormatedDate = (dateString) => {
    const date = new Date(dateString);
    let mm = (date.getMonth() + 1);
    mm = `${mm >= 10 ? '' : '0'}${mm}`;
    let dd = date.getDate();
    dd = `${dd >= 10 ? '' : '0'}${dd}`;
    return [dd, mm, date.getFullYear()].join('.');
};

class PureUserCard extends React.PureComponent {
    render(){
        const {
            image,
            date = '',
            fullName = '',
            mail = '',
            removeable = false,
            remove,
            isDropArea = false,
            ...props } = this.props;
        const { classes } = props;
        return(
            <Box
                boxShadow={3}
                className={`${classes.wrap} ${isDropArea?classes.dropArea:''}`}
                style={{['pointer-events']: 'all'}}
                {...props}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={image}
                        title="User photo"
                    />
                    <CardContent className={classes.content}>
                        <Typography variant="body2">
                            {fullName}
                            {`, дата регистрации: ${getFormatedDate(date)}`}
                        </Typography>
                        <Typography variant="body2">
                            {mail}
                        </Typography>
                    </CardContent>
                    {removeable &&
                        <CardActions className={classes.actionBlock}>
                            <IconButton onClick={remove} className={classes.iconButton}> 
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        </CardActions>
                    }
                </Card>
            </Box>
        );
    };

}

export const UserCard = withStyles(styles)(PureUserCard)
