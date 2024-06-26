import React, { useState } from 'react';
import edit_pencil from '../../images/edit.png';
import tag_image from '../../images/price-tag.png'
import ModalBar from '../UI/modal/ModalBar'
import './Tag.css'
import TagModalContent from '../tagmodalcontent/TagModalContent';
import TagService from '../../API/TagService';
import UserService from '../../API/UserService';

const Tag = ({tag, setTags}) => {
    const [isOpen, setOpen] = useState(false);
    const [modalBar, setModalBar] = useState(false);

    const recall = () => {
        setOpen(false)
        setModalBar(true)
    }
    
    return (
        <div className="tag__content">
            <ModalBar visible={modalBar} setVisible={setModalBar}>
                <TagModalContent tag={tag} setVisible={setModalBar} setTags={setTags}/>
            </ModalBar>

            <div class="tag__title">
                <div style={{backgroundColor: tag.color}} className='img-tag-container'>
                    <img className='img-tag' src={tag_image} alt=''/>
                </div>
                
                <span className="title" onClick={() => {recall()}}>
                        {tag.name}
                </span>
                
                <div class="tag__edit">
                    <button onClick={() => setOpen(!isOpen)}>
                        <img className="edit-img" src={edit_pencil} alt=''/>
                    </button>

                    <div className={`edit-menu ${isOpen ? 'open' : ''}`}>
                        <div>
                            <button onClick={() => {recall()}}>
                                edit
                            </button>
                        </div>
                        <div>
                            <button onClick={() => {
                                TagService.deleteTag(tag.id).then(() => {
                                    UserService.refreshToken(String(localStorage.getItem('refresh_token'))).then((tokens) => {
                                        console.log("new_tokens", tokens)
                                        localStorage.setItem('access_token', tokens.access_token)
                                        localStorage.setItem('refresh_token', tokens.refresh_token)
                                    }).then(() => {
                                        TagService.getTags().then((data) => {
                                            setTags(data)
                                        })
                                    })
                                })
                            }}>
                                delete
                            </button>
                        </div>
                    </div>
                </div> 
            </div>

            <span className="tag__underline"></span>
        </div>
    );
};

export default Tag;