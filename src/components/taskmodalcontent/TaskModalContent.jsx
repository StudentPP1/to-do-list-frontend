import React, { useEffect, useState } from 'react';
import down_arrow from '../../images/down-arrow.png'
import TaskTick from '../tasktick/TaskTick';
import TaskDatePicker from '../datepicker/TaskDatePicker';
import EditDescription from '../taskeditfields/EditDescription'
import EditTitle from '../taskeditfields/EditTitle'
import TaskService from '../../API/TaskService';
import TagService from '../../API/TagService';
import AddTask from '../addtask/AddTask';
import TagList from '../taglist/TagList';
import './TaskModalContent.css';
import UserService from '../../API/UserService';
import Loader from '../UI/loader/Loader'

const TaskModalContent = ({updateDate, all_tags, visible, setVisible, task, setTasks, changeDate, selected, tasks}) => {
    const max_sub_task_level = 5;
    var loadMainTask = false;
    const [isLoading, setLoading] = useState(false);
    var desc_default = "Description"
    const [currentTask, setCurrentTask] = useState(task);
    const [titleValue, setTitleValue] = useState(currentTask.title);
    const [descValue, setDescValue] = useState(currentTask.description);
    const [currentDate, setDate] = useState(currentTask.date);
    const [tags, setTags] = useState([]);
    const [subtasks, setSubTasks] = useState([]);
    const [isTagsOpen, setTagsOpen] = useState(false);
    const [addTaskModal, setAddTaskModal] = useState(false);
    const [isSubTaskOpen, setSubTaskOpen] = useState(false);
    const [subTaskLevel, setSubTaskLevel] = useState(0);
    const [currentSubTask, setSubCurrentTask] = useState(null)
    const [change, setChange] = useState(false);

    const loadData = (task) => {
        setLoading(true)
        try {
            TaskService.getTask(task.id).then((takenTask) => {
                TaskService.getAllTasks(takenTask.subTasksId).then((tasks) => {
                    setSubTasks(tasks)
                    console.log(1)
                })
                TagService.getAllTags(takenTask.tagsId).then((tags) => {
                    setTags(tags)
                    console.log(2)
                })

                setCurrentTask(takenTask)
                setTitleValue(takenTask.title)
                if (takenTask.description == '') {
                    setDescValue(desc_default)
                }
                else {
                    setDescValue(takenTask.description)
                }
                console.log(3)
            }).then(() => {
                setLoading(false)
            })
        } catch (error) {
            
        } 
    }

    useEffect(() => {
        if (!change && !isTagsOpen && !addTaskModal) {
            loadData(currentTask)
        }
    }, [isTagsOpen, addTaskModal])

    useEffect(() => {
        if (!loadMainTask) {
            loadData(task)
            loadMainTask = true
        }
    }, [visible])

    function dragStartHandlerInTask(e, task) {
        setSubCurrentTask(task)
    }
    
    function dragEndHandlerInTask(e) {
        e.target.style.boxShadow = 'none' 
    }
    
    function dragOverHandlerInTask(e) {
        e.preventDefault() 
        e.target.style.boxShadow = '0 2px 0 #FFFFFF' 
    }
    
    function dropHandlerInTask(e, task) {
        e.preventDefault()
     
        setSubTasks(subtasks.map(t => {
          if (t.id === task.id) { 
            TaskService.updateTask(
                t.id, 
                t.title, 
                t.description, 
                t.date, 
                t.tagsId, 
                t.parentId,
                currentSubTask.order
                ).then(() => {
                    console.log("updated")
                })
            return {...t, order: currentSubTask.order}
          }
          if (t.id === currentSubTask.id) {
            TaskService.updateTask(
                t.id, 
                t.title, 
                t.description, 
                t.date, 
                t.tagsId, 
                t.parentId,
                task.order
                ).then(() => {
                    console.log("updated")
                })
            return {...t, order: task.order}
          }
          return t
        }))
        e.target.style.boxShadow = 'none' 
    }
    
    const sortTasks = (a, b) => {
        if (a.order > b.order) {
          return 1
        }
        else {
          return -1
        }
    }

    const changeContents = (task, title, desc, date, tags, sub_tasks, level) => {
        setChange(true)
        setCurrentTask(task)
        setSubTaskOpen(false)
        setTitleValue(title)
        if (desc == '') {
            setDescValue(desc_default)
        }
        else {
            setDescValue(desc)
        }
        setDate(date)
        setTags(tags)
        setSubTaskLevel(level)
        setSubTasks(sub_tasks)

        TagService.getAllTags(task.tagsId).then((tags) => {
            setTags(tags)
        })
        TaskService.getAllTasks(task.subTasksId).then((tasks) => {
            setSubTasks(tasks)
        })

        setTagsOpen(false)
        setAddTaskModal(false)
        setSubTaskOpen(false)
    }

    const closeModal = (e) => {
        if (currentTask.parentId != null ) {
            console.log("back to parent")
            TaskService.getTask(currentTask.parentId).then((t) => {
                console.log(t)
                changeContents(
                    t,
                    t.title,
                    t.description,
                    t.date,
                    [],
                    [],
                    t.nestingLevel
                )
            }).then(() => {
                setChange(false)
            })
        }
        else {
            setTagsOpen(false)
            setAddTaskModal(false)
            setSubTaskOpen(false)
            setVisible(false)
        }
    }

    return (
        <div>
        {isLoading
        ?
        <div className='loader-modal'>
            <div className='loader-container'>
                    <Loader/>
            </div>
        </div>
        :
        <div className='task-modal'>
            <div className="close">
                <div className='close-void'>
                </div>
                <div className="close-area" onClick={(e) => { 
                     closeModal(e)
                }}>
                    <button className="close-button">
                        x
                    </button>
                </div>
            </div>

            <div className='modal-content'>
                <div className='task__side-content left'>
                    {isLoading
                    ?
                    <Loader/>
                    :
                    <div className='sub-task-view'>
                    {subtasks.length > 0 
                    ? 
                    <div className='sub-task-open-button' onClick={() => {
                        setSubTaskOpen(!isSubTaskOpen)
                        }}>
                        <img 
                        className={`sub-task-open-button-img ${isSubTaskOpen ? 'open' : ''}`} 
                        src={down_arrow} alt=''
                        />
                    </div>
                    : 
                    <div></div>
                    }


                    {subtasks.length > 0 
                    ? 
                    <div className={`sub-task-list ${isSubTaskOpen ? 'open' : ''}`}>
                    
                    { 
                    subtasks.sort(sortTasks).map((sub_task) => 
                        <div>
                            <div 
                            onDragStart={(e) => dragStartHandlerInTask(e, sub_task)} 
                            onDragLeave={(e) => dragEndHandlerInTask(e)} 
                            onDragEnd={(e) => dragEndHandlerInTask(e)} 
                            onDragOver={(e) => dragOverHandlerInTask(e)} 
                            onDrop={(e) => dropHandlerInTask(e, sub_task)} 
                            draggable={true} 
                            className='sub_task'
                            >
                                <TaskTick 
                                updateDate={updateDate} 
                                taskId={sub_task.id} 
                                setTasks={setTasks}
                                parentTask={currentTask}
                                tasks={subtasks}
                                setSubTasks={setSubTasks}
                                />
                                <span onClick={() => {
                                    console.log("change: ", sub_task)
                                    setLoading(true)
                                    changeContents(
                                        sub_task,
                                        sub_task.title,
                                        sub_task.description,
                                        sub_task.date,
                                        [],
                                        [],
                                        sub_task.nestingLevel
                                    ).then(() => {
                                        setLoading(false)
                                    })
                                }}>{sub_task.title}</span>
                            </div>
                            <span className="task__underline"></span>
                        </div>
                    )}
                    </div>
                    :
                    <div></div>
                    }
               
                    <div className='task-text'>
                        <div className='task__title'>
                            <TaskTick 
                            updateDate={updateDate} 
                            taskId={currentTask.id} 
                            setTasks={setTasks}
                            changeDate={changeDate}
                            closeModal={closeModal}
                            tasks={tasks}
                            selected={selected}
                            />
                            <EditTitle titleValue={titleValue} setTitleValue={setTitleValue}/>
                        </div>
                        <EditDescription descValue={descValue} setDescValue={setDescValue}/>
                    </div>
                    </div>
                    }


                    <div className="task__content">

                        <TaskDatePicker currentDate={currentDate} setDate={setDate}/>
                        {isLoading
                        ?
                        <Loader/>
                        :
                        <div className="task__tags">
                            <TagList 
                            all_tags={all_tags} 
                            tags={tags} 
                            setTags={setTags}
                            task={currentTask}
                            isTagsOpen={isTagsOpen} 
                            setTagsOpen={setTagsOpen}
                            />
                        </div>
                        }
                       
                    </div>
                </div>

                <div className="task__side-content right">
                    <div className="task-buttons">
                            <button className="save-task" onClick={() => {
                                let taskDescription;
                                if (descValue == desc_default) {
                                    taskDescription = ''
                                }
                                else {
                                    taskDescription = descValue
                                }

                                let taskTitle;
                                if (titleValue == '') {
                                    taskTitle = currentTask.title
                                }
                                else {
                                    taskTitle = titleValue
                                }

                                let taskTags = tags.map(tag => {return tag.id})
                                var taskDate = new Date(currentDate).toLocaleDateString();
                                let temp = taskDate.split('.')
                                taskDate = temp[2].split(',')[0] + '-' + temp[1].padStart(2, '0') + '-' + temp[0].padStart(2, '0')
                                console.log(taskTags)
                                console.log(currentTask)
                                console.log(taskDate)
         
                                TaskService.updateTask(
                                    currentTask.id,
                                    taskTitle,
                                    taskDescription,
                                    taskDate,
                                    taskTags,
                                    currentTask.parentId,
                                    currentTask.order
                                    ).then(() => {
                                        console.log("updated")
                                        if (updateDate.length > 1 || updateDate.at(0).title_date) {
                                            try {
                                                TaskService.getTasksByDate(
                                                    updateDate.map((date) => {return changeDate(date.date)})
                                                    ).then((tasks) => {
                                                        setTasks(
                                                            updateDate.map((date) => {
                                                              return {
                                                                id: updateDate.indexOf(date) + 1, 
                                                                title: date.title_date, 
                                                                items: tasks.at(updateDate.indexOf(date))
                                                              }
                                                            })
                                                          )
                                                    })
                                            } catch (error) {
                                                
                                            }
                                        }
                                        else {
                                            TaskService.getTasksByDate(updateDate).then((tasks) => {
                                                setTasks(tasks.at(0))
                                            })
                                        }
                                    })
                            }}>
                                <span>
                                    Save
                                </span>
                            </button>

                            {subTaskLevel < max_sub_task_level
                            ? 
                            <div className="add-task-taskmodal-container">
                                <button className="add-task-taskmodal" onClick={() => {setAddTaskModal(!addTaskModal); }}>
                                    <span className="add-task-text">
                                        +
                                    </span>
                                </button>

                                <AddTask 
                                updateDate={updateDate} 
                                tags={all_tags} 
                                visible={addTaskModal} 
                                setVisible={setAddTaskModal} 
                                tasks={subtasks} 
                                parentTask={currentTask}
                                setSubTasks={setSubTasks}
                                setTasks={setTasks}
                                selected={task.date}
                                />
                            </div>
                            :
                            <div className="add-task-taskmodal-container"></div>
                            }

                            <button className="delete-task" onClick={() => {
                                     TaskService.deleteTask(currentTask.id, selected).then(() => {
                                        console.log("Task is deleted")
                                        UserService.refreshToken(String(localStorage.getItem('access_token'))).then((tokens) => {
                                            console.log("new_tokens", tokens)
                                            localStorage.setItem('access_token', tokens.access_token)
                                            localStorage.setItem('refresh_token', tokens.refresh_token)
                                        }).then(() => {
                                            if (currentTask.parentId == null) {
                                                console.log(updateDate)
                                        if (updateDate.length > 1 || updateDate.at(0).title_date) {
                                            console.log("delete from week")
                                            setTasks(
                                                tasks.map((board) => {
                                                    if (board.items.indexOf(task) !== -1) {
                                                        let new_board = board
                                                        const currentIndex = board.items.indexOf(task) 
                                                        new_board.items.splice(currentIndex, 1) 
                
                                                        if (new_board.items.length > 0) {
                                                            new_board.items.slice(currentIndex).map((item) => {
                                                                item.order -= 1
                                                            }
                                                        )
                                                        TaskService.updateSomeTask(new_board.items).then(() => {
                                                            console.log("updated")
                                                        })
                                                        }
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
                                            const currentIndex = tasks.indexOf(task) 
                                            let new_tasks = tasks.filter(t => t.id !== task.id)
            
                                            if (new_tasks.length > 0) {
                                                new_tasks.slice(currentIndex).map(item => {
                                                    item.order -= 1
                                                })
                                            }
                                            setTasks(new_tasks)
                                            TaskService.updateSomeTask(new_tasks).then(() => {
                                                console.log("updated")
                                              })
                                            console.log("new_tasks: ", new_tasks)
                                        }
                                            }
                                            else {
                                                const currentIndex = subtasks.map(t => t.id).indexOf(currentTask.taskId)
                                                let new_tasks = subtasks.filter(t => t.id !== currentTask.taskId)

                                                if (new_tasks.length > 0) {
                                                    new_tasks.slice(currentIndex).map(item => {
                                                    item.order -= 1
                                                    })
                                                }
                                                setSubTasks(new_tasks)
                                                TaskService.updateSomeTask(new_tasks).then(() => {
                                                    console.log("updated")
                                                  })
                                                console.log("subtasks: ", subtasks)
                                            }
                                        }).then(() => {closeModal()})
                                 
                                    })}}>
                                <span>
                                    Delete
                                </span>
                            </button>
                    </div>
                </div>
            </div>
        </div>
        }
        </div>
        
    );
};

export default TaskModalContent;