import React from 'react';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

function MembersList({ isRemoveEnabled, isAddEnabled, removeFunc, addFunc, list = [] }) {
    return (
        <div className='membersList'>
            <List>
                {renderList(list, removeFunc, addFunc, isRemoveEnabled, isAddEnabled)}
            </List>
        </div>
    )
}

function renderList(list = [], removeFunc, addFunc, isRemoveEnabled = false, isAddEnabled = false) {
    return (
        list.map((member) => {
            return renderMember(member, isRemoveEnabled, isAddEnabled, removeFunc, addFunc);
        })
    )
}

function renderMember(member, isRemoveEnabled, isAddEnabled, removeFunc, addFunc) {
    return (
        <ListItem key={`list-${member.name}`}>
            <Link to={`/users/${member._id}`}>
                <ListItemText primary={member.name} />
            </Link>
            {addActionButtons(member, isRemoveEnabled, isAddEnabled, removeFunc, addFunc)}
        </ListItem>
    )
}

function addActionButtons(member, isRemoveEnabled, isAddEnabled, removeFunc, addFunc) {
    if (!isRemoveEnabled && !isAddEnabled)
        return (null);

    const addButton = () => {
        return (
            <IconButton aria-label='delete' edge='end' onClick={() => {
                    addFunc(member._id)
                }}>
                <AddIcon />
            </IconButton>
        )
    };
    const removeButton = () => {
        return (
            <IconButton aria-label='delete' edge='end' onClick={() => {
                removeFunc(member._id)
            }}>
                <ClearIcon />
            </IconButton>
        )
    };

    return (
        <ListItemSecondaryAction>
            {isAddEnabled ? addButton() : undefined}
            {isRemoveEnabled ? removeButton() : undefined}
        </ListItemSecondaryAction>
    )
}

export default MembersList;