import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      padding: 2
    },
  }));

function Post(props) {
    const content = props.content;
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography component="p">
                {content}
            </Typography>
        </Paper>
    )
}

export default Post;