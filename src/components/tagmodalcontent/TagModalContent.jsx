import React, { useState } from 'react';
import './TagModalContent.css'
import EditTitle from '../taskeditfields/EditTitle';

const TagModalContent = ({tag, setVisible, setTags, mode}) => {
    const [name, setName] = useState(tag.name);
    const [color, setColor] = useState(tag.color);
    const colors = ['green', 'red', 'blue', 'white']

    return (
        <div className='tag-modal'>
            <div className='modal-content'>

                <div className='content-title'>
                    <h1>
                        {mode === 'change' ? 'Edit tag' : 'Create tag'}
                    </h1>
                </div>

                <span className="modal__underline"></span>

                <div className='content'>
                    <div className='form-field'>
                        <div className='box-title'>
                            Tag name
                        </div>
                        <div className='box'>
                            <EditTitle titleValue={name} setTitleValue={setName}/>
                        </div>
                    </div>

                    <div className='form-field'>
                        <div className='box-title'>
                            Tag color
                        </div>
                        <div className='box'>
                            <div className='choose-color'>
                                <div style={{backgroundColor: color}}>
                                </div>
                                <span>
                                    {color}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <span className="modal__underline"></span>

                <div className='content-footer'>
                    <div className='footer-buttons'>
                        <div className='cancel' onClick={() => {setVisible(false)}}>
                            <span>Cancel</span>
                        </div>
                        <div className='save' onClick={() => {setVisible(false)}}>
                            <span>Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagModalContent;