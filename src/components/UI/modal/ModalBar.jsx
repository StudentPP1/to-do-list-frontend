import React from 'react';
import cl from './ModalBar.module.css';

const ModalBar = ({children, visible, setVisible, setChildrenVisible}) => {

    const rootClasses = [cl.TaskModalBar]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={cl.ModalContent} onClick={(e) => e.stopPropagation()} id="modal">
                {children}
            </div>
        </div>
    );
};

export default ModalBar;