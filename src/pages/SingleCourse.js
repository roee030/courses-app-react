import React from 'react'
import { Link } from "react-router-dom";

export default function SingleCourse(props) {
    return (
        <div>
            This is Course id {props.match.params.id}
        </div>
    )
}
