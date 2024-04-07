import React, { useState } from 'react';
import edit_pencil from '../../images/edit.png';
import TaskService from '../../API/TaskService';
import UserService from '../../API/UserService';
import './DoneTask.css'

const DoneTask = ({task, list, setList}) => {
    const [isOpen, setOpen] = useState(false);
    
    const updateState = () => {
        setOpen(false)
        setList(list.map((item) => {
                return {"date": item.date, "tasks": item.tasks.filter(t => t !== task)}
        }
        ))
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
                                    TaskService.replaceTaskToActive(task.id).then(() => {
                                        updateState()
                                    }).then(() => {
                                        UserService.refreshToken(String(localStorage.getItem('access_token'))).then((tokens) => {
                                            console.log("new_tokens", tokens)
                                            localStorage.setItem('access_token', tokens.access_token)
                                            localStorage.setItem('refresh_token', tokens.refresh_token)
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