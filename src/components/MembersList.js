import React from 'react';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

function MembersList(props) {
    const isRemoveEnabled = props.isRemoveEnabled;
    const isAddEnabled = props.isAddEnabled;
    const removeFunc = props.removeFunc;
    const addFunc = props.addFunc;
    const memberFunc = props.memberFunc;
    const list = props.list || [];

    return (
        <div className='membersList'>
            <List>
                {renderList(list, memberFunc, removeFunc, addFunc, isRemoveEnabled, isAddEnabled)}
            </List>
        </div>
    )
}

function renderList(list = [], memberFunc, removeFunc, addFunc, isRemoveEnabled = false, isAddEnabled = false) {
    return (
        list.map((member) => {
            return renderMember(member, memberFunc, isRemoveEnabled, isAddEnabled, removeFunc, addFunc);
        })
    )
}

function renderMember(member, memberFunc, isRemoveEnabled, isAddEnabled, removeFunc, addFunc) {
    return (
        <ListItem key={`list-${member.name}`}>
            <Link to={`/users/${member._id}`}>
                <ListItemText primary={member.name} onClick={() => {
                    memberFunc(member._id)
                }}/>
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
                <ClearIcon />
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