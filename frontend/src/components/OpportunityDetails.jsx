import { useOpportunitiesContext } from '../hooks/useOpportunitiesContext.jsx'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const OpportunityDetails = ({opportunity}) => {
    const { dispatch } = useOpportunitiesContext()

    const handleClick = async () => {

        const API_BASE_URL =
        process.env.NODE_ENV === 'production'
        ? 'https://bruin-opportunities.onrender.com'
        : 'http://localhost:4000';

        const response = await fetch('https://bruin-opportunities.onrender.com/api/opportunities/' + opportunity._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_OPPORTUNITY', payload: json})
        }
    }

    return (
        <div className="opportunity-details">
            <h4>{opportunity.title}</h4>
            <p><strong>Field: </strong>{opportunity.field}</p>
            <p><strong>Pay: </strong>{opportunity.pay}</p>
            <p>{formatDistanceToNow(new Date(opportunity.createdAt), { addSuffix: true})}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default OpportunityDetails