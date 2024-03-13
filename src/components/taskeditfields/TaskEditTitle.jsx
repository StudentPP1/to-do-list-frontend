import React from 'react';
import './TaskEditTitle.css'

const TaskEditTitle = (props) => {
    return (
            <input className="title_edit" value={props.titleValue} onChange={(e) => props.setTitleValue(e.target.value)}>
            </input> 
    );
};

export default TaskEditTitle;