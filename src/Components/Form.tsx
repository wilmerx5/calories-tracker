
import { FormEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import { useActivity } from "../hooks/use-Activity"
import { Activity } from "../types"


const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0
}
export default function Form() {

    const{state,dispatch}= useActivity()
    const [activity, setActivity] = useState<Activity>(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {

        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: "save-activity", payload: { newActivity: activity } })

        setActivity({ ...initialState, id: uuidv4() })
    }
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== "" && calories > 0
    }

    useEffect(() => {
        if (state.activeId) {

            const selectedActivity= state.activities.filter(act=> act.id==state.activeId)
         
             setActivity(selectedActivity[0])
        }

    }, [state.activeId])
    return (
        <form className="space-y-5 bg-white box-shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >

            <div className="grid grid-cols-1 gap-3">
                <label className="font-bold" htmlFor="category"> Category:</label>
                <select
                    value={activity.category}
                    onChange={handleChange}
                    className="border border-slate-300 rounded-lg outline-blue-400" id="category">

                    {categories.map(cat => (<option value={cat.id} key={cat.id}>
                        {cat.name}
                    </option>))}
                </select>

            </div>
            <div className="grid grid-cols-1 gap-3" >
                <label className="font-bold" htmlFor="name"> name:</label>

                <input
                    onChange={handleChange}

                    value={activity.name}
                    id="name" type="text" className="outline-blue-400 border border-slate-300 p-2 rounded-lg"
                    placeholder="ex. Food, salad, exercie, crossfit"
                ></input>
            </div>

            <div className="grid grid-cols-1 gap-3" >
                <label className="font-bold" htmlFor="calories"> calories:</label>

                <input
                    onChange={handleChange}

                    value={activity.calories}
                    id="calories" type="text" className=" outline-blue-400 border border-slate-300 p-2 rounded-lg"
                    placeholder="ex. 500"
                ></input>
            </div>
            <input

                disabled={!isValidActivity()}
                type="submit"
                value={activity.category == 1 ? 'Save food' : 'Save Exercise'}
                className="disabled:opacity-40 cursor-pointer bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white">
            </input>
        </form>
    )
}
