import { useState } from "react"
import { useOpportunitiesContext } from '../hooks/useOpportunitiesContext.jsx'


const OpportunityForm = () => {
    const { dispatch } = useOpportunitiesContext()

    const [title, setTitle] = useState('')
    const [field, setField] = useState('')
    const [pay, setPay] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const opportunity = {title, field, pay}

        const response = await fetch('/api/opportunities', {
            method: 'POST',
            body: JSON.stringify(opportunity),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok){
            setTitle('')
            setField('')
            setPay('')
            setError(null)
            setEmptyFields([])
            console.log('new opportunity added', json)
            dispatch({type: 'CREATE_OPPORTUNITIES', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Opportunity</h3>

            <label>Opportunity Title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Field: </label>
            <input 
                type="text" 
                onChange={(e) => setField(e.target.value)}
                value={field}
                className={emptyFields.includes('field') ? 'error' : ''}
            />

            <label>Pay: </label>
            <input 
                type="number" 
                onChange={(e) => setPay(e.target.value)}
                value={pay}
                className={emptyFields.includes('pay') ? 'error' : ''}
            />

            <button>Add Opportunity</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default OpportunityForm