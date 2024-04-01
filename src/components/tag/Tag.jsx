import React, { useState } from 'react';
import edit_pencil from '../../images/edit.png';
import tag_image from '../../images/price-tag.png'
import './Tag.css'

const Tag = ({tag, setTags}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="tag__content">
            <div class="tag__title">
                <div style={{backgroundColor: tag.color}} className='img-tag-container'>
                    <img className='img-tag' src={tag_image} alt=''/>
                </div>
                
                <span className="title" onClick={() => {}}>
                        {tag.name}
                </span>
                
                <div class="tag__edit">
                    <button onClick={() => setOpen(!isOpen)}>
                        <img className="edit-img" src={edit_pencil} alt=''/>
                    </button>

                    <div className={`edit-menu ${isOpen ? 'open' : ''}`}>
                        <div>
                            <button onClick={() => {}}>
                                edit
                            </button>
                        </div>
                        <div>
                            <button onClick={() => {}}>
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