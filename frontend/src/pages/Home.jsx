import { useEffect } from 'react'
import { useOpportunitiesContext } from '../hooks/useOpportunitiesContext.jsx'

import OpportunityDetails from '../components/OpportunityDetails.jsx'
import OpportunityForm from '../components/OpportunityForm.jsx'


const Home = () => {
    const {opportunities, dispatch} = useOpportunitiesContext()

    useEffect(() =>{

        const fetchOpportunities = async () => {
            // const API_BASE_URL =
            // process.env.NODE_ENV === 'production'
            // ? 'https://bruin-opportunities.onrender.com'
            // : 'http://localhost:4000';

            const response = await fetch('https://bruin-opportunities.onrender.com/api/opportunities/')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_OPPORTUNITIES', payload: json})
            }
        }

        fetchOpportunities()
    }, [dispatch])

    return (
        <div className="home">
            <div className="opportunities">
                {opportunities && opportunities.map((opportunity) => (
                    <OpportunityDetails key = {opportunity._id} opportunity = {opportunity} />
                ))}
            </div>
            <OpportunityForm />
        </div>
    )
}

export default Home