import React from 'react'
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

function MembersList(props) {
    const isRemoveEnabled = props.isRemoveEnabled;
    const removeFunc = props.removeFunc;
    const memberFunc = props.memberFunc;
    const list = props.list || [];
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
    return (
        <div className='membersList'>
            <List>
                {renderList(list, memberFunc, removeFunc, isRemoveEnabled)}
            </List>
        </div>
    )
}

function renderList(list = [], memberFunc, removeFunc, isRemoveEnabled = false) {
    if (isRemoveEnabled) {
        return (
            list.map((member) => {
                return renderSimpleMember(member, memberFunc);
            })
        )
    }

    return (
        list.map((member) => {
            return renderRemovableMember(member, memberFunc, removeFunc);
        })
    )
}

function renderSimpleMember(member, memberFunc) {
    return (
        <ListItem>
            <ListItemText primary={member.name} onClick={() => {
                memberFunc(member._id)
            }}/>
        </ListItem>
    )
}

function renderRemovableMember(member, memberFunc, removeFunc) {
    return (
        <ListItem>
            <ListItemText primary={member.name} onClick={() => {
                memberFunc(member._id)
            }}/>
            <ListItemSecondaryAction>
                <IconButton aria-label='delete' edge='start' onClick={() => {
                    removeFunc(member._id)
                }}>
                      <ClearIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default SimpleMembersList;