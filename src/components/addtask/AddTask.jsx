import React, { useState } from 'react';
import TaskModalBar from '../UI/modal/TaskModalBar';
import TagList from '../taglist/TagList';
import './AddTask.css'
import DatePicker from 'react-datepicker';

const AddTask = (props) => {
    const default_name = "Task name"
    const default_description = "Description"

    const [isTagsOpen, setTagsOpen] = useState(false);
    const [titleValue, setTitleValue] = useState(default_name);
    const [descValue, setDescValue] = useState(default_description);
    const [tags, setTags] = useState([]);
    const [currentDate, setDate] = useState(new Date());

    const changeTask = (name, description, date, tags) => {
        if (description == default_description) {
            description = ''
        }
        if (name != default_name) {
            if (props.board == null) {
                if (props.tasks.length > 0) {
                    var new_order = props.tasks[props.tasks.length - 1].order + 1
                    var new_id = props.tasks[props.tasks.length - 1].id + 1
                }
                else {
                    var new_order = 1
                    var new_id = 1
                }
                const task = {id: new_id, name: name, description: description, date: date, tags: tags, sub_tasks: [], order: new_order}
            
                props.setTasks(props.tasks.concat([task]))
            
                if (props.currentTask != null) {
                    props.currentTask.sub_tasks.push(task)
                }
    
                if (props.parentTask != null && props.currentTask != null) {
                    props.parentTask.sub_tasks = props.parentTask.sub_tasks.map((sub_task) => {
                        if (sub_task.id == props.currentTask.id) {
                            sub_task.sub_tasks.push(task)
                            return sub_task
                        }
                        else {
                            return sub_task
                        }
                    }) 
                }
            }
            else {
                var current_task_list = props.tasks.at(props.board.id - 1)
          
                if (current_task_list.length > 0) {
                    var new_order = current_task_list[current_task_list.length - 1].order + 1
                    var new_id = current_task_list[current_task_list.length - 1].id + 1
                }
                else {
                    var new_order = 1
                    var new_id = 1
                }
                
                const task = {id: new_id, name: name, description: description, date: date, tags: tags, sub_tasks: [], order: new_order}
                
                props.setTasks(props.tasks.map((board_tasks) => {
                    if (props.tasks.indexOf(board_tasks) == props.board.id - 1) {
                        return board_tasks.concat([task])
                    }
                    else {
                        return board_tasks
                    }
                }))
                props.setBoards(props.boards.map((b) => {
                    if (b.id == props.board.id) {
                        b.items = b.items.concat([task])
                        return b
                    }
                    else {
                        return b
                    }
                }))
            }
            
            props.setVisible(false);
        }
    }

    return (
            <div className={`add-task-modal ${props.visible ? 'open' : ''}`}>
                <div className="close">
                    <div className='close-void'>
                    </div>
                    <div className="close-area" onClick={() => {props.setVisible(!props.visible);setTagsOpen(false)}}>
                        <button className="close-button">
                                x
                        </button>
                    </div>
                </div>

                <div className='task-create'>
                    <div className='task-text-fields'>
                        <input className="name_edit" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}>
                        </input> 
                        <input className="desc_edit"  value={descValue} onChange={(e) => setDescValue(e.target.value)}>
                        </input>
                    </div>
                    <div className='task-labels'>
                        <div className="task__date">
                            <DatePicker
                            selected={currentDate}
                            onChange={value => setDate(value)}
                            minDate={currentDate}
                            dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className='new-tags-list'>
                            <TagList all_tags={props.tags} tags={null} setTags={setTags} isTagsOpen={isTagsOpen} setTagsOpen={setTagsOpen}/>
                        </div>
                    </div>
                </div>
                <div className='task-save'>
                    <button className="save-task" onClick={() => {setTagsOpen(false); changeTask(titleValue, descValue, currentDate, tags)}}>
                            <span>
                                Save task
                            </span>
                    </button>
                </div>
            </div>
    );
};

export default AddTask;