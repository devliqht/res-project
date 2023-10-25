import './../css/StaffView.css'
import './../css/Button3.css'
import { useExperimentsContext } from '../hooks/useExperimentsContext'
import { useLogsContext } from '../hooks/useLogsContext'
import { useEffect, useState } from 'react'

const Experiments = ({experiments}) => {
    return (
        <div className="experimentList">
            <div className="experiment">
                <h3>Experiment Name: </h3>
                <p>{experiments.experimentName}</p>

                <h3>Experiment Number: </h3>
                <p>{experiments.experimentNo}</p>
            </div>
        </div>
    )
}

const Logs = ({logs}) => {
    return (
        <div className="log">
            <div className="logDetail">
            <h2>{logs.studentName}</h2>
            </div>
            <div className="logDetail">
                <h3>Student ID: </h3>
                <p>{logs.studentID}</p>
            </div>
            <div className="logDetail">      
                <h3>Student Blocksection: </h3>
                <p>{logs.studentBlocksection}</p>
            </div>
            <div className="logDetail">            
                <h3>Student Group No.: </h3>
                <p>{logs.studentGroup}</p>
            </div>
            <div className="logDetail">            
                <h3>Apparatuses Borrowed: </h3>
                <p>{logs.apparatuses[0].name}</p>
                <p>{logs.apparatuses[1].name}</p>
            </div>
        </div>
    )
}
const StaffView = () => {

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

    const { logs, dispatchLogs } = useLogsContext()
    useEffect(() => {
      const fetchLogs = async () => {
        const response = await fetch('/api/logs')
        const json = await response.json()
  
        if (response.ok) {
            console.log("LOGS Database Response OK")
            console.log(json)
          dispatchLogs({type: 'SET_LOGS', payload: json})
        } else {
            console.log("LOGS Database Response NOT OK")
        }
      }
  
      fetchLogs()
    }, [dispatchLogs])

    const [experimentName, setExperimentName] = useState('');
    const [experimentID, setExperimentID] = useState(0);
    const SaveData = async (event) => { 
        event.preventDefault();
    }

    return (
        <div className="home">
            <div className="staffView">
                <h1>Staff View</h1>
                <div className="experimentInfo">
                    <h2> Your Experiments: </h2>
                    {experiments && experiments.map(experiment => (
                        <Experiments experiments={experiment}/>
                    ))}
                </div>
                <div className="experimentCreate">
                    <h2> Create an experiment: </h2>
                    <form className="experiment-form" onSubmit={SaveData}>
                        <div className="nice-form-group">
                            <label>Experiment Name<span style={{color: 'var(--uscred)'}}> *</span></label>
                            <input 
                            type="text" 
                            required
                            placeholder="Experiment Name" 
                            value={experimentName} 
                            onChange={(Event) => setExperimentName(Event.target.value)}/>
                        </div>

                        <div className="nice-form-group">
                            <label>Experiment Number<span style={{color: 'var(--uscred)'}}> *</span></label>
                            <input 
                            type="number" 
                            placeholder="1" 
                            required
                            value={experimentID} 
                            
                            onChange={(Event) => setExperimentID(Event.target.value)}/>
                        </div>
                        <button id="submit-button" className="button-3" role="button" type="submit">Submit</button>
                    </form>
                </div>

                <div className="logList">
                    <h2>Student Logs</h2>
                    {logs && logs.map(log => (
                        <Logs logs={log}/>
                    ))}
                </div>
            </div>
        </div>
        

    )
}

export {
    StaffView
}