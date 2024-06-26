import React from 'react';
import tag_image from '../../images/price-tag.png'
import './TaskTag.css'

const TaskTag = (props) => {
    return (
        <div className='tag-container'>
            <div style={{backgroundColor: props.tag.color}} className='img-tag-container'>
                <img className='img-tag' src={tag_image} alt=''/>
            </div>
            <span className='tag-name'>{props.tag.name}</span>
            <div className='checkbox-container'>
                <input type="checkbox" checked={props.checked} onClick={props.command}/>
            </div>
        </div>
    );
};

export default TaskTag;