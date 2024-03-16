import React from 'react';
import check from '../../images/check.png'
import "./TaskTick.css"

const TaskTick = ({boards, setBoards, done_tasks, setDoneTasks, current_task, tasks, setTasks, isSubTask}) => {
    const done_task = () => {
        
        if (boards != null) {
            setBoards(boards.map((board) => {
                if (board.items.indexOf(current_task) != -1) {
                    board.items = board.items.filter(t => t !== current_task)
                    return board
                }
                else {
                    return board
                }
            }
            ))
            if (!isSubTask) {
                setTasks(tasks.map((task_list) => {
                    if (task_list.indexOf(current_task) != -1) {
                        return task_list.filter(t => t !== current_task)
                    }
                    else {
                        return task_list
                    }
                }))
            } else {
                setTasks(tasks.filter(t => t !== current_task))
                }
        }
        else {
            try {
                tasks.sub_tasks = tasks.sub_tasks.filter(t => t !== current_task)
            } catch (ex) {
                setTasks(tasks.filter(t => t !== current_task))
            }
        }
        
        setDoneTasks([...done_tasks, current_task])
    }

    return (
        <div className="task__tick" onClick={() => done_task(done_tasks, setDoneTasks, current_task, setTasks)}>
            <img className="tick-img" src={check} alt=""/>
        </div>
    );
};

export default TaskTick;