import './Task.css'
import TaskTick from '../tasktick/TaskTick';
import edit_pencil from '../../images/edit.png';
import ModalBar from '../UI/modal/ModalBar'
import { useState, useEffect } from 'react';
import TaskService from '../../API/TaskService';
import UserService from '../../API/UserService';
import TagService from '../../API/TagService';
import TaskModalContent from '../taskmodalcontent/TaskModalContent';
import Loader from '../UI/loader/Loader'

const Task = ({isDrag, updateDate, all_tags, task, setTasks, changeDate}) => {
    const [isOpen, setOpen] = useState(false);
    const [modalBar, setModalBar] = useState(false);
    const [currentTask, setCurrentTask] = useState(task);
    const [dataLoading, setDataLoading] = useState(true);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (!modalBar || isDrag) {
            try {
                TaskService.getTask(task.id).then((takenTask) => {
                    setCurrentTask(takenTask)
                    TagService.getAllTags(takenTask.tagsId).then((tags) => {
                        setTags(tags)
                    }).then(() => {
                        setDataLoading(false)
                    })
                })   
                } catch (error) {
                    setDataLoading(false)
                }
        }
    }, [modalBar, isDrag])

    const recall = () => {
        setOpen(false)
        setModalBar(true)
    }

    return (
        <div className="task">
            {!dataLoading
            ?
            <ModalBar visible={modalBar} setVisible={setModalBar}>
                <TaskModalContent 
                updateDate={updateDate}
                all_tags={all_tags} 
                visible={modalBar}
                setVisible={setModalBar} 
                task={currentTask} 
                setTasks={setTasks}
                changeDate={changeDate}
                />
            </ModalBar>
            :
            <div></div>
            }   

            <div className="main-task__content">

                <div class="task__title">
                    <TaskTick 
                    updateDate={updateDate} 
                    taskId={task.id} 
                    setTasks={setTasks}
                    changeDate={changeDate}
                    />
                    
                    <span className="title" onClick={() => {recall()}}>
                        {task.title.length > 50 ? `${task.title.slice(0, 50)}...` : task.title}
                    </span> 
                    {!dataLoading
                    ?
                    <ul className="tags-list">
                        <li>
                            {tags.length > 0
                            ? 
                            <a style={{color: tags[0].color}}>{tags[0].name}</a>
                            :
                            <a></a>}
                            {tags.length > 0
                            ? 
                            <span style={{color: tags[0].color}}>{tags.length-1 > 0 ? `+${tags.length-1}` : ''}</span>
                            :
                            <span></span>}
                            
                        </li>
                    </ul>
                    :
                    <div class="loader-div">
                        <Loader/>
                    </div>
                    }
                    <div class="task__edit">
                        <button onClick={() => setOpen(!isOpen)}>
                            <img className="edit-img" src={edit_pencil} alt=''/>
                        </button>
                        <div className={`edit-menu ${isOpen ? 'open' : ''}`}>
                            <div>
                                <button onClick={() => {recall()}}>
                                    edit
                                </button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setOpen(false)
                                    TaskService.deleteTask(task.id).then(() => {
                                        console.log("deleted")
                                        UserService.refreshToken(String(localStorage.getItem('access_token'))).then((tokens) => {
                                            console.log("new_tokens", tokens)
                                            localStorage.setItem('access_token', tokens.access_token)
                                            localStorage.setItem('refresh_token', tokens.refresh_token)
                                        }).then(() => {
                                            try {
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
                                            } catch (error) {
                            
                                            }
                                            
                                        })
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

export default Task;