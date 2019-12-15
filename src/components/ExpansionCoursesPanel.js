import React from 'react'
import CoursesGrid from './CoursesGrid';

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

function ExpansionCoursesPanel(props) {
    const classes = useStyles();
    const admin = props.expansions.admin || { approved: [], pending: [] };
    const participate = props.expansions.participate || { approved: [], pending: [] };
  
    return (
        <div className={classes.root}>
            {renderExpansionPanels('admin', admin, classes)}
            {renderExpansionPanels('participate', participate, classes)}
      </div>
    );
}

function renderExpansionPanels(title, expansion, classes) {
    const approved = expansion.approved;
    const pending = expansion.pending;
    const total = [];
    total.push(...approved);
    total.push(...pending);

    return (
        createExpansionPanel(title, total, classes)
    )
}

function createExpansionPanel(title, courses = [], classes) {
    if (courses.length === 0)
        return;

    
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography className={classes.heading}>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    <CoursesGrid courses={courses}/>
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default ExpansionCoursesPanel;