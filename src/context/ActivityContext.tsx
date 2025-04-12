import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activityreducer";
type ActivityProviderProps={
    children:ReactNode
}

type ActivityContextProps={
    state:ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesTracked:number,
    caloriesBurned:number,
    netCalories:number
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children}:ActivityProviderProps)=>{

    const [state,dispatch]= useReducer(activityReducer,initialState)
    const caloriesTracked = useMemo(() => state.activities.reduce((total, actual) => actual.category == 1 ? total + actual.calories : total, 0), [state.activities])
    const caloriesBurned = useMemo(() => state.activities.reduce((total, actual) => actual.category == 2 ? total + actual.calories : total, 0), [state.activities])

    const netCalories = useMemo(()=>caloriesTracked-caloriesBurned,[state.activities])

    return(
        <ActivityContext.Provider
        value={{
                state,dispatch, caloriesTracked,caloriesBurned,netCalories
        }}
        >
                {children}
        </ActivityContext.Provider>
    )
}