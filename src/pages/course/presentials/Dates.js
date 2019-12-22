import React from 'react';

export default function Dates({ fromDate, toDate }) {
    if (!fromDate || !toDate)
        return;

    return (
        <div id='datesContainer'>
            <div id='fromDate'>
                From: {fromDate}
            </div>
            <div id='toDate'>
                To: {toDate}
            </div>
        </div>
    )
}