import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { categories } from "../data/categories";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activityreducer";
import { Activity } from "../types";
type ActivityProviderProps={
    children:ReactNode
}

type ActivityContextProps={
    state:ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesTracked:number,
    caloriesBurned:number,
    netCalories:number,
    isEmptyActivities: Boolean
    categoryName:(category:Activity['category'])=>string[]
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children}:ActivityProviderProps)=>{

    const [state,dispatch]= useReducer(activityReducer,initialState)
    const caloriesTracked = useMemo(() => state.activities.reduce((total, actual) => actual.category == 1 ? total + actual.calories : total, 0), [state.activities])
    const caloriesBurned = useMemo(() => state.activities.reduce((total, actual) => actual.category == 2 ? total + actual.calories : total, 0), [state.activities])

    const netCalories = useMemo(()=>caloriesTracked-caloriesBurned,[state.activities])


    const categoryName = useMemo(() => (category: Activity['category']) =>
        categories.map(cat => cat.id === category ? cat.name : "")

        , [state.activities])


     const isEmptyActivities = useMemo(()=> state.activities.length===0 ,[state.activities])   

    return(
        <ActivityContext.Provider
        value={{
                state,dispatch, caloriesTracked,caloriesBurned,netCalories,categoryName,isEmptyActivities
        }}
        >
                {children}
        </ActivityContext.Provider>
    )
}