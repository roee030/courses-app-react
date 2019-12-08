import React from 'react'

export default function SingleCourse(props) {
    return (
        <div>
            This is Course id {props.match.params.id}
        </div>
    )
}
