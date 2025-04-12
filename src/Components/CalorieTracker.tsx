import { useActivity } from "../hooks/use-Activity"


function CalorieTracker() {

    const { netCalories,caloriesBurned,caloriesTracked}= useActivity()

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">CALORIES TRACKED</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-orange-300">{caloriesTracked}</span>
                    consumed
                </p>

                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-lime-300">{caloriesBurned}</span>
                    Burned
                </p>

                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className={`font-black text-6xl ${netCalories>=0?'text-red-500':'text-lime-500'}`}>{netCalories}</span>
                    Total
                </p>

            </div>

        </>
    )
}

export default CalorieTracker