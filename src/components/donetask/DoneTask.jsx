import React from 'react';
// зробити Drag and drop, Done, (в тижні, сайдбар буде поверх)
const DoneTask = ({name, color}) => {
    return (
        <div>
            <div className="main-task__content">
                <div class="task__title">
                    <span className="label">You completed a task:</span> 
                    <span className="title">{name}</span>  
                </div>  
            </div> 
        </div>
    );
};

export default DoneTask;