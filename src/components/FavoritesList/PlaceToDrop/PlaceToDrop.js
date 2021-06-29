import React, { useState } from 'react';
import { useStyles } from './PlaceToDrop.style';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export const PlaceToDrop = () => {
    const classes = useStyles();
    return (
        <Box boxShadow={3} className={classes.wrap}>
            <Typography variant="h6" style={{['pointer-events']: 'none'}}>
                Добавить в избранное
            </Typography>
        </Box>
    );
};