import React from 'react';
import './TaskEditDescription.css'

const TaskEditDescription = (props) => {
    return (
        <input className="description_edit"  value={props.descValue} onChange={(e) => props.setDescValue(e.target.value)}>
        </input> 
    );
};

export default TaskEditDescription;