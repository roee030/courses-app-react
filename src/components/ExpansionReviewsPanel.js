import React from 'react'
import ReviewsGrid from './ReviewsGrid';

// material ui libraries
import { makeStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: 15,
      fontWeight: 3
    },
}));

function ExpansionReviewsPanel(props) {
    const classes = useStyles();
    const reviews = props.reviews || [];
    console.log('revvvvvvv');
    console.log(reviews);
    
    return (
        <div className={classes.root}>
            {renderExpansionPanels('reviews', reviews, classes)}
      </div>
    );
}

function renderExpansionPanels(title, reviews = [], classes) {
    if (reviews.length === 0)
        return;

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.heading}>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography component={'span'}>
                    <ReviewsGrid reviews={reviews}/>
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default ExpansionReviewsPanel;