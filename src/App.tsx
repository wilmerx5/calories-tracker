import { useEffect, useMemo } from "react"
import ActivityList from "./Components/ActivityList"
import CalorieTracker from "./Components/CalorieTracker"
import Form from "./Components/Form"
import { useActivity } from "./hooks/use-Activity"

function App() {

  const{state,dispatch} = useActivity()

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestarApp = () => useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>

      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">

          <h1 className="text-center text-lg font-bold text-white uppercase"> Calories tracker</h1>

          <button
            onClick={() => dispatch({ type: 'reset-app' })}
            disabled={!canRestarApp()}
            className="disabled:opacity-65 bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded text-sm "
          >Reset App</button>
        </div>

      </header>

      <section className=" bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            state={state}
            dispatch={dispatch}
          ></Form>
        </div>
      </section>

      <section className="bg-gray-800 py-10 ">
        <div className="max-w-4xl mx-auto">
      <CalorieTracker
      >
        
      </CalorieTracker>
        </div>

      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}

        ></ActivityList>
      </section>
    </>
  )
}

export default App
