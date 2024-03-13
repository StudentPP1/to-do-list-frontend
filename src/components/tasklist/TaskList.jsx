import Task from '../task/Task';
import './TaskList.css'
import plus from '../../images/plus.png'
import { useState } from 'react';
import AddTask from '../addtask/AddTask';

const TaskList = ({done_tasks, setDoneTasks, tasks, setTasks, tags, title}) => {
    const [modal, setModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null)

    function dragStartHandler(e, task) {
        console.log("drag", task)
        setCurrentTask(task)
      }
    
      function dragEndHandler(e) {
        e.target.style.boxShadow = 'none' 
      }
    
      function dragOverHandler(e) {
        e.preventDefault() 
        e.target.style.boxShadow = '0 2px 0 #9D331F' 
      }
    
      function dropHandler(e, task) {
        e.preventDefault()
        console.log("drop", task)
     
        setTasks(tasks.map(t => {
          if (t.id === task.id) { 
            return {...t, order: currentTask.order}
          }
          if (t.id === currentTask.id) {
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
    
    
    return (
        <div className='task-list-body'>
            <div className="title">
                <div className="title-main">
                    <h1>{title}</h1>    
                </div>
                <div className="title-tasks">
                    <p>{tasks.length} tasks</p>
                </div>
            </div>

            <div className="task-list">
                {tasks.sort(sortTasks).map((task) =>
                    <div
                        onDragStart={(e) => dragStartHandler(e, task)} 
                        onDragLeave={(e) => dragEndHandler(e)} 
                        onDragEnd={(e) => dragEndHandler(e)} 
                        onDragOver={(e) => dragOverHandler(e)} 
                        onDrop={(e) => dropHandler(e, task)} 
                        draggable={true} 
                        className="task-container"
                        onClick={(e) => {e.target.parentNode.parentNode.parentNode.parentNode.draggable=false}}
                        >
                            <Task done_tasks={done_tasks} setDoneTasks={setDoneTasks} task={task} all_tags={tags} tasks={tasks} setTasks={setTasks}/>
                    </div>
                )}
            </div>
            <button className="add-task" onClick={() => setModal(!modal)}>
                    <div>
                        <img src={plus} alt=""/>
                    </div>
                    <span>
                        Add task
                    </span>
                </button>
                <AddTask tags={tags} visible={modal} setVisible={setModal} tasks={tasks} setTasks={setTasks}/>
        </div>
    );
};

export default TaskList;