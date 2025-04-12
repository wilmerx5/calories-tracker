import { PencilIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useActivity } from "../hooks/use-Activity"



function ActivityList() {

    const {state,dispatch,isEmptyActivities,categoryName}= useActivity()
    const {activities} = state

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Food and activities</h2>

            {
            isEmptyActivities? <p className="font-black text-2xl text-center mt-10"> There are no activity yet</p>:
            activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">

                    <div className=" space-y-2 relative ">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                        ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'} `}> {categoryName(activity.category)}</p>
                        <p className="text-2xñ font-bold pt-5"> {activity.name}</p>
                        <p className="font-black text-4xl text-lime-500"> {activity.calories} {""} <span>Calories</span></p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button
                        onClick={()=> dispatch({type:'set-activeId', payload:{id:activity.id}})}
                        >
                                <PencilIcon className=" cursor-pointer h-8 w-8 text-gray-800">
                                    
                                    
                                </PencilIcon>
                        </button>

                        <button
                              onClick={()=> dispatch({type:'delete-activity', payload:{id:activity.id}})}
                        >

                                    <XCircleIcon className=" pointer h-8 w-8 text-red-800">

                                    </XCircleIcon>
                        </button>
                    </div>
                </div>))}
        </>
    )
}

export default ActivityList