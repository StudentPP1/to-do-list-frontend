import React from 'react';
import check from '../../images/check.png'
import "./TaskTick.css"
import TaskService from '../../API/TaskService';
import UserService from '../../API/UserService';

const TaskTick = (props) => {
      
    const done_task = () => {
        var today = new Date().toLocaleString();
        var temp = today.split('.')
        today = temp[2].split(',')[0] + '-' + temp[1].padStart(2, '0') + '-' + temp[0].padStart(2, '0')
       
        TaskService.doneTask(props.taskId).then(() => {
            UserService.refreshToken(String(localStorage.getItem('access_token'))).then((tokens) => {
                console.log("new_tokens", tokens)
                localStorage.setItem('access_token', tokens.access_token)
                localStorage.setItem('refresh_token', tokens.refresh_token)
            }).then(() => {
                if (props.parentTask != null) {
                    props.setSubTasks(props.tasks.filter(t => t.id !== props.taskId))
                }
                else {
                    if (props.updateDate.length > 1) {
                        try {
                            TaskService.getTasksByDate(
                                props.updateDate.map((date) => {return props.changeDate(date.date)})
                                ).then((tasks) => {
                                    console.log(tasks, props.setTasks)
                                    props.setTasks(
                                        props.updateDate.map((date) => {
                                          return {
                                            id: props.updateDate.indexOf(date) + 1, 
                                            title: date.title_date, 
                                            items: tasks.at(props.updateDate.indexOf(date))
                                          }
                                        })
                                      )
                                })
                        } catch (error) {
                            
                        }
                        
                    }
                    else {
                        TaskService.getTasksByDate(props.updateDate).then((tasks) => {
                            props.setTasks(tasks.at(0))
                        })
                    }
                    try {
                        props.closeModal()
                    } catch (error) {
                        
                    }
                }
            })
            })
    }

    return (
        <div className="task__tick" onClick={() => done_task()}>
            <img className="tick-img" src={check} alt=""/>
        </div>
    );
};

export default TaskTick;