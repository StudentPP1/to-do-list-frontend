import React, { useContext, useEffect, useState } from 'react';
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
import {AuthContext} from "../../context";

const TaskModalContent = ({updateDate, all_tags, visible, setVisible, task, setTasks, changeDate}) => {
    // TODO: fix view, start Done page and test delete tag and then check task
    const max_sub_task_level = 5;
    var loadMainTask = false;
    var desc_default = "Description"
    const {isLoading, setLoading} = useContext(AuthContext);
    const [currentTask, setCurrentTask] = useState(task);
    const [titleValue, setTitleValue] = useState(currentTask.title);
    const [descValue, setDescValue] = useState("Loading...");
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
        TaskService.getTask(task.id).then((takenTask) => {
            TaskService.getAllTasks(takenTask.subTasksId).then((tasks) => {
                setSubTasks(tasks)
            })
        })
        TaskService.getTask(task.id).then((takenTask) => {
            TagService.getAllTags(takenTask.tagsId).then((tags) => {
                setTags(tags)
            })
        })
        TaskService.getTask(task.id).then((takenTask) => {
            setCurrentTask(takenTask)
            setTitleValue(takenTask.title)
            if (takenTask.description == '') {
                setDescValue(desc_default)
            }
            else {
                setDescValue(takenTask.description)
            }
        })
        setLoading(false)
    }

    useEffect(() => {
        if (!change) {
            loadData(currentTask)
            setChange(false)
        }
    }, [isTagsOpen, addTaskModal])

    useEffect(() => {
        if (!loadMainTask) {
            console.log(1)
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
            setLoading(true)
            TaskService.getTask(currentTask.parentId).then((task) => {
                changeContents(
                    task,
                    task.title,
                    task.description,
                    task.date,
                    [],
                    [],
                    task.nestingLevel
                )
            })
            setLoading(false)
        }
        else {
            setTagsOpen(false)
            setAddTaskModal(false)
            setSubTaskOpen(false)
            setVisible(false)
        }
    }

    return (
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
                                    console.log(sub_task)
                                    changeContents(
                                        sub_task,
                                        sub_task.title,
                                        sub_task.description,
                                        sub_task.date,
                                        [],
                                        [],
                                        sub_task.nestingLevel
                                    )
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
                            />
                            <EditTitle titleValue={titleValue} setTitleValue={setTitleValue}/>
                        </div>
                        <EditDescription descValue={descValue} setDescValue={setDescValue}/>
                    </div>
                    </div>
                    }


                    <div className="task__content">
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
                                        
                                    })
                            }}>
                                <span>
                                    Save task
                                </span>
                            </button>

                            <button className="delete-task" onClick={() => {
                                     console.log(currentTask.id)
                                     TaskService.deleteTask(currentTask.id).then(() => {
                                        console.log("deleted")
                                        UserService.refreshToken(String(localStorage.getItem('access_token'))).then((tokens) => {
                                            console.log("new_tokens", tokens)
                                            localStorage.setItem('access_token', tokens.access_token)
                                            localStorage.setItem('refresh_token', tokens.refresh_token)
                                        }).then(() => {
                                            if (updateDate.length > 1) {
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
                                        }).then(() => {closeModal()})
                                 
                                    })}}>
                                <span>
                                    Delete task
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="task__side-content right">
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

                    {subTaskLevel < max_sub_task_level
                            ? 
                            <div>
                                
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
                            <div></div>
                            }
                </div>
            </div>
        </div>
    );
};

export default TaskModalContent;