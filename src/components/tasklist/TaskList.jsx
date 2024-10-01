import Task from '../task/Task';
import './TaskList.css'
import plus from '../../images/plus.png'
import { useState } from 'react';
import AddTask from '../addtask/AddTask';
import TaskService from '../../API/TaskService';

const TaskList = ({ updateDate, tasks, setTasks, tags, title, selected }) => {
  const [modal, setModal] = useState(false);
  const [drag, setDrag] = useState(false);
  const [currentTask, setCurrentTask] = useState(null)
  const [draggable, setDraggable] = useState(true);

  var selected;
  if (updateDate.length > 1) {
    selected = null
  }
  else {
    selected = updateDate.at(0)
  }
  if (tasks == null) {
    tasks = []
  }

  function dragStartHandler(e, task) {
    setDrag(false)
    console.log("drag", task)
    setCurrentTask(task)
    e.target.style.boxShadow = 'none'
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

    setTasks(tasks.map(t => {
      if (t.id === task.id) {
        TaskService.updateTask(
          t.id,
          t.title,
          t.description,
          t.date,
          t.tagsId,
          t.parentId,
          currentTask.order
        )
        return { ...t, order: currentTask.order }
      }
      if (t.id === currentTask.id) {
        TaskService.updateTask(
          t.id,
          t.title,
          t.description,
          t.date,
          t.tagsId,
          t.parentId,
          task.order
        )
        return { ...t, order: task.order }

      }
      return t
    }))
    console.log("changed")
    setDrag(true)
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
  console.log("today: ", tasks)
  return (
    <div className='task-list-body'>
      <div className='task-list-content'>
        <div className='title'>
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
              draggable={draggable}
              className="task-container"
              onClick={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            >
              <Task
                isDrag={drag}
                updateDate={updateDate}
                all_tags={tags}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
                selected={selected}
                setDraggable={setDraggable}
              />
            </div>
          )}
        </div>
        <button className="add-task" onClick={() => setModal(!modal)}>
          <div>
            <img src={plus} alt="" />
          </div>
          <span>
            Add task
          </span>
        </button>
        <AddTask
          selected={selected}
          updateDate={updateDate}
          tags={tags}
          visible={modal}
          setVisible={setModal}
          tasks={tasks}
          parentTask={null}
          setTasks={setTasks} />
      </div>
    </div>
  );
};

export default TaskList;