import { createContext, useReducer } from 'react'

export const OpportunitiesContext = createContext()

export const opportunitiesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_OPPORTUNITIES':
            return {
                opportunities: action.payload
            }
        case 'CREATE_OPPORTUNITIES':
            return {
                opportunities: [action.payload, ...state.opportunities]
            }
        case 'DELETE_OPPORTUNITY':
            return{
                opportunities: state.opportunities.filter((o) => o._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const OpportunitiesContextProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(opportunitiesReducer, {
        opportunties: null
    })


    return(
        <OpportunitiesContext.Provider value={{...state, dispatch}}>
            { children }
        </OpportunitiesContext.Provider>
    )
}