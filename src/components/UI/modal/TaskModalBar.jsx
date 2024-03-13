import React from 'react';
import cl from './TaskModalBar.module.css';

const TaskModalBar = ({children, visible, setVisible, setChildrenVisible}) => {

    const rootClasses = [cl.TaskModalBar]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        // <div className={rootClasses.join(' ')} onClick={(e) => {
        //     setVisible(false); 
        //     setChildrenVisible(false)
        //     console.log(e.target.parentNode.parentNode.draggable=true)
        //     }}>
        <div  className={rootClasses.join(' ')}>
            <div className={cl.ModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default TaskModalBar;