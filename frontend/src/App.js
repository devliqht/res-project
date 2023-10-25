import './css/App.css';
import './css/Home.css'
import { StudentView, MainStudentView, StudentViewWithLogForm } from './pages/StudentView';
import { StaffView } from './pages/StaffView';
import { useLogsContext } from './hooks/useLogsContext'
import { useExperimentsContext } from './hooks/useExperimentsContext';
import { useEffect, useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const { experiments, dispatchExperiments } = useExperimentsContext()

    useEffect(() => {
      const fetchExperiments = async () => {
        const response = await fetch('/api/experiments')
        const json = await response.json()
  
        if (response.ok) {
            console.log("EXPERIMENTS Database Response OK")
            console.log(json)
          dispatchExperiments({type: 'SET_EXPERIMENTS', payload: json})
        } else {
            console.log("EXPERIMENTS Database Response NOT OK")
        }
      }
  
      fetchExperiments()
    }, [dispatchExperiments])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/studentView" element={<MainStudentView></MainStudentView>}/>
          <Route path="/staffView" element={<StaffView />}/>
          {experiments && experiments.map(experiment => (
            <Route key={experiment._id} path={'/studentView/'+experiment._id} element={<div className="home"><StudentView/><StudentViewWithLogForm experiment={experiment}/></div>}/>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
