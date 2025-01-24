import { OpportunitiesContext } from "../context/OpportunityContext"
import { useContext } from 'react'

export const useOpportunitiesContext = () => {
    const context = useContext(OpportunitiesContext)

    if (!context) {
        throw Error('useOpportunitiesContext must be used inside a OpportunitiesContextProvider')
    }

    return context
}