import React, { useState } from 'react';
import edit_pencil from '../../images/edit.png';
import TaskService from '../../API/TaskService';
import UserService from '../../API/UserService';
import {RefreshTokens} from '../../utils/RefreshTokens'
import './DoneTask.css'

const DoneTask = ({task, list, setList, dates, sendDates}) => {
    const [isOpen, setOpen] = useState(false);
    
    const updateState = () => {
        var send = sendDates(dates)
        RefreshTokens().then(() => {
            TaskService.getDoneTasks(send).then((data) => {
                setList(send.map((date) => {
                    if (data[date] == null) {
                        return {"date": date, "tasks": []}
                    }
                    else {
                        return {"date": date, "tasks": data[date]}
                    }
                }))   
            }).then(() => {
                setOpen(false)
            })
        })
    }

    return (
        <div className="task">

             <div className="main-task__content">
                <div class="task__title">
                    <span className="title">
                        {task.title}
                    </span> 

                    <div class="task__edit">
                        <button onClick={() => setOpen(!isOpen)}>
                            <img className="edit-img" src={edit_pencil} alt=''/>
                        </button>
                        <div className={`edit-menu ${isOpen ? 'open' : ''}`}>
                            <div>
                                <button onClick={() => {
                                    RefreshTokens().then(() => {
                                        TaskService.replaceTaskToActive(task.id, task.date).then(() => {
                                            updateState()
                                        })
                                    })
                                    }}>
                                    return
                                </button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    TaskService.deleteTask(task.id).then(() => {
                                        updateState()
                                    })
                                    }}>
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>  
                </div>
             </div>
             <span className="task__underline"></span>
        </div>
    );
};

export default DoneTask;