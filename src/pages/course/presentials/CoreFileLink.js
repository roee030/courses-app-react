import React from 'react';
import Button from '@material-ui/core/Button';

export default function CoreFileLink({ coreFileLink }) {
    return (
        <div>
            <Button variant="contained" color="primary" href={coreFileLink}>
                Core File Link
            </Button>
        </div>
    )
}