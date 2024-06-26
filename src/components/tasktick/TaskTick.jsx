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
       
        TaskService.doneTask(props.taskId, props.selected).then(() => {
            UserService.refreshToken(String(localStorage.getItem('refresh_token'))).then((tokens) => {
                console.log("new_tokens", tokens)
                localStorage.setItem('access_token', tokens.access_token)
                localStorage.setItem('refresh_token', tokens.refresh_token)
            }).then(() => {
                if (props.parentTask != null) {
                    const currentIndex = props.tasks.map(t => t.id).indexOf(props.taskId)
                    let new_tasks = props.tasks.filter(t => t.id !== props.taskId)

                    if (new_tasks.length > 0) {
                        new_tasks.slice(currentIndex).map(item => {
                            item.order -= 1
                        })
                    }

                    props.setSubTasks(new_tasks)
                    TaskService.updateSomeTask(new_tasks).then(() => {
                        console.log("updated")
                      })
                    console.log("subtasks: ", props.tasks)
                }
                else {
                    if (props.updateDate.length > 1 || props.updateDate.at(0).title_date) {
                        console.log("delete from week")
                        props.setTasks(
                            props.tasks.map((board) => {
                                if (board.items.map(t => t.id).indexOf(props.taskId) !== -1) {
                                    let new_board = board
                                    const currentIndex = board.items.map(t => t.id).indexOf(props.taskId) 
                                    new_board.items.splice(currentIndex, 1) 

                                    if (new_board.items.length > 0) {
                                        new_board.items.slice(currentIndex).map((item) => {
                                            item.order -= 1
                                        }
                                        )
                                    }
                                    TaskService.updateSomeTask(new_board.items).then(() => {
                                        console.log("updated")
                                    })
                                    return new_board
                                }
                                else {
                                    return board
                                }
                            })
                        )
                    }
                    else {
                        console.log("delete from today")
                        const currentIndex = props.tasks.map(t => t.id).indexOf(props.taskId)
                        let new_tasks = props.tasks.filter(t => t.id !== props.taskId)

                        if (new_tasks.length > 0) {
                            new_tasks.slice(currentIndex).map(item => {
                                item.order -= 1
                            })
                        }
                        props.setTasks(new_tasks)
                        TaskService.updateSomeTask(new_tasks).then(() => {
                            console.log("updated")
                          })
                        console.log("new_tasks: ", new_tasks)
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