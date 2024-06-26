import React, { useState } from 'react';
import './TagModalContent.css'
import EditTitle from '../taskeditfields/EditTitle';
import TagService from '../../API/TagService';
import UserService from '../../API/UserService';

const TagModalContent = ({tag, setVisible, setTags}) => {
    const colors = ['green', 'red', 'blue', 'white', 'pink', 'gray', 'olive' , 'navy' , 'orange', 'orangered',
'palevioletred', 'purple', 'seagreen', 'skyblue', 'teal', 'violet', 'bisque']
    const [name, setName] = useState(tag === null ? '' : tag.name);
    const [color, setColor] = useState(tag === null ? colors.at(0) : tag.color);
    const [open, setOpen] = useState(false);
    var title = tag === null ? 'Create tag' : 'Edit tag';

    const editTag = (id, name, color) => {
        TagService.updateTag(id, name, color).then(() => {
            UserService.refreshToken(String(localStorage.getItem('refresh_token'))).then((tokens) => {
                console.log("new_tokens", tokens)
                localStorage.setItem('access_token', tokens.access_token)
                localStorage.setItem('refresh_token', tokens.refresh_token)
            }).then(() => {
                TagService.getTags().then((data) => {
                    setTags(data)
                }).then(() => {                          
                    setVisible(false)
                })
            })
        })
    }

    const createTag = (name, color) => {
        TagService.addTag(name, color).then(() => {
            UserService.refreshToken(String(localStorage.getItem('refresh_token'))).then((tokens) => {
                console.log("new_tokens", tokens)
                localStorage.setItem('access_token', tokens.access_token)
                localStorage.setItem('refresh_token', tokens.refresh_token)
            }).then(() => {
                TagService.getTags().then((data) => {
                    setTags(data)
                }).then(() => {                          
                    setVisible(false)
                })
            })
        })
    }

    return (
        <div className='tag-modal'>
            <div className='modal-content'>

                <div className='content-title'>
                    <h1>
                        {title}
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
                        <div className='box' onClick={() => {setOpen(!open)}}>
                            <div className='choose-color'>
                                <div style={{backgroundColor: color}}>
                                </div>
                                <span>
                                    {color}
                                </span>
                            </div>
                        </div>
                        <ul className={`tags-drop ${open ? 'open' : ''}`}>
                                    {colors.filter(c => c !== color).map((c) =>
                                    <li onClick={() => {setColor(c); setOpen(false)}}>
                                        <div className='choose-color'>
                                        <div style={{backgroundColor: c}}>
                                        </div>
                                        <span>
                                            {c}
                                        </span>
                                    </div>
                                    </li>)}
                        </ul>
                    </div>
                </div>

                <span className="modal__underline"></span>

                <div className='content-footer'>
                    <div className='footer-buttons'>
                        <div className='cancel' onClick={() => {
                            setName(tag === null ? '' : tag.name);
                            setColor(tag === null ? colors.at(0) : tag.color);
                            setVisible(false)}}>
                            <span>Cancel</span>
                        </div>
                        <div className='save' onClick={() => {
                            if (tag == null) {
                                createTag(name, color)
                            }
                            else {
                                editTag(tag.id, name, color)
                            }
                            }}>
                            <span>Save</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TagModalContent;