import React from 'react';
import './EditDescription.css'

const EditDescription = (props) => {
    return (
        <input className="description_edit"  value={props.descValue} onChange={(e) => props.setDescValue(e.target.value)}>
        </input> 
    );
};

export default EditDescription;