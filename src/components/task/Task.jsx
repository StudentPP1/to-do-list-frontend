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
import { RefreshTokens } from '../../utils/RefreshTokens';

const Task = ({isDrag, updateDate, all_tags, task, setTasks, changeDate, overdue, selected, tasks, setDraggable}) => {
    const [isLoading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [modalBar, setModalBar] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (!modalBar || isDrag ) {
            console.log("trying update")
            setLoading(true)
            TaskService.getTask(task.id).then((takenTask) => {
                TagService.getAllTags(takenTask.tagsId).then((tags) => {
                    setTags(tags)
                })
                console.log("update tags")
            }).then(() => {
                setLoading(false)
            })
        }
    }, [modalBar, isDrag])

    const recall = () => {
        setOpen(false)
        setModalBar(true)
        setDraggable(false)
    }

    return (
        <div className="task">
            {!overdue 
            ?
            <ModalBar visible={modalBar} setVisible={setModalBar}>
                <TaskModalContent 
                updateDate={updateDate}
                all_tags={all_tags} 
                visible={modalBar}
                setVisible={setModalBar} 
                task={task} 
                setTasks={setTasks}
                changeDate={changeDate}
                selected={selected}
                tasks={tasks}
                setDraggable={setDraggable}
                />
            </ModalBar>
            :
            <div></div>
            }   

            <div className="main-task__content">

                <div className="task__title">
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
                    
                    <span className="title" onClick={() => {
                        if (!overdue) {
                            recall()
                        }}}>
                        {task.title.length > 50 ? `${task.title.slice(0, 50)}...` : task.title}
                    </span> 

                    {!isLoading 
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
                    <div className="loader-div">
                        <Loader/>
                    </div>
                    }

                    {!overdue
                    ?
                    <div className="task__edit">
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
                                TaskService.deleteTask(task.id, selected).then(() => {
                                    console.log("Task is deleted")
                                    RefreshTokens()
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
                                                        })
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
                                            console.log("before: ", new_tasks)

                                            setTasks(new_tasks)
                                            TaskService.updateSomeTask(new_tasks).then(() => {
                                                console.log("updated")
                                              })
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