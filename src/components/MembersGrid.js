import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import MembersLists from '../components/MembersList';

// members example = [{ title: 'example', isRemoveEnabled: true/false, list: [], removeFunc: Function }]
function MembersGrid(props) {
    const members = props.members || [];
    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
          maxWidth: 752,
        },
        // demo: {
        //   backgroundColor: theme.palette.background.paper,
        // },
        title: {
          margin: 2
        },
    }));
    const classes = useStyles();

    if (members.length === 0)
        return(null);

    return (
        <Grid item xs={12} md={6}>
            {renderTitlesAndLists(members, classes)}
        </Grid>
    )
}

function renderTitlesAndLists(members = [], classes) {
    return (
        members.map((membersListObj, i) => {
            return (
                <div key={`member-${i}`}>
                    {renderTitle(membersListObj.title, classes)}
                    {renderList(membersListObj.isAddEnabled, membersListObj.addFunc, membersListObj.isRemoveEnabled, membersListObj.removeFunc, membersListObj.list)}
                </div>                
            )
        })
    )
}

function renderList(isAddEnabled, addFunc, isRemoveEnabled, removeFunc, list) {
    return (
        <MembersLists addFunc={addFunc} isAddEnabled={isAddEnabled} isRemoveEnabled={isRemoveEnabled} list={list} removeFunc={removeFunc} />
    )
}

function renderTitle(title, classes) {
    return (
        <Typography variant="h6" className={classes.title}>
            {title}
        </Typography>
    )
}

export default MembersGrid;