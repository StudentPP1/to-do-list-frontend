import './Task.css'
import TaskTick from '../tasktick/TaskTick';
import edit_pencil from '../../images/edit.png';
import ModalBar from '../UI/modal/ModalBar'
import { useState, useEffect, useContext } from 'react';
import TaskService from '../../API/TaskService';
import UserService from '../../API/UserService';
import TagService from '../../API/TagService';
import TaskModalContent from '../taskmodalcontent/TaskModalContent';
import Loader from '../UI/loader/Loader'
import {AuthContext} from "../../context";

const Task = ({isDrag, updateDate, all_tags, task, setTasks, changeDate, overdue, selected, tasks}) => {
    const {isLoading, setLoading} = useContext(AuthContext);
    const [isOpen, setOpen] = useState(false);
    const [modalBar, setModalBar] = useState(false);
    const [currentTask, setCurrentTask] = useState(task);
    const [dataLoading, setDataLoading] = useState(true);
    const [tags, setTags] = useState([]);
   
    useEffect(() => {
        if ((!modalBar || isDrag) && (!isOpen)) {
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
            {!overdue && !dataLoading && !isLoading
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
                selected={selected}
                tasks={tasks}
                />
            </ModalBar>
            :
            <div></div>
            }   

            <div className="main-task__content">

                <div class="task__title">
                    {!overdue
                    ?
                    <TaskTick 
                    updateDate={updateDate} 
                    taskId={task.id} 
                    setTasks={setTasks}
                    changeDate={changeDate}
                    tasks={tasks}
                    selected={selected}
                    />
                    :
                    <></>
                    }
                    
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
                    {!overdue
                    ?
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
                                // FIXME change order task and subtasks && add ignore error for tags api call
                                TaskService.deleteTask(task.id, selected).then(() => {
                                    console.log("Task is deleted")
                                    UserService.refreshToken(String(localStorage.getItem('access_token'))).then((tokens) => {
                                        console.log("new_tokens", tokens)
                                        localStorage.setItem('access_token', tokens.access_token)
                                        localStorage.setItem('refresh_token', tokens.refresh_token)
                                    })
                                    .then(() => {
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
                                            console.log("new_tasks: ", new_tasks)
                                        }
                                    })
                                })
                                    }}>
                                delete
                            </button>
                        </div>
                    </div>
                    </div> 
                    :
                    <div>
                        
                    </div>
                    } 
                </div> 
            </div>

            <span className="task__underline"></span>
        </div>
    );
};

export default Task;