import React from 'react'
import { useParams } from 'react-router'

function TicketDetails() {
    const {id} = useParams();
    return (
        <div>
            {id}
        </div>
    )
}

export default TicketDetails
