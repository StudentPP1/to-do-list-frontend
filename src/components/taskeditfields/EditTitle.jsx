import React from 'react';
import './EditTitle.css'

const EditTitle = (props) => {
    return (
            <input className="title_edit" value={props.titleValue} onChange={(e) => props.setTitleValue(e.target.value)}>
            </input> 
    );
};

export default EditTitle;