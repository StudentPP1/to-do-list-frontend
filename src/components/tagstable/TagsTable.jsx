import React, { useState } from 'react';
import Tag from '../tag/Tag';
import './TagsTable.css'
import ModalBar from '../UI/modal/ModalBar'
import TagModalContent from '../tagmodalcontent/TagModalContent';

const TagsTable = ({tags, setTags}) => {
    console.log("tags: ", tags)
    const [modal, setModal] = useState(false);

    return (
        <div className='table'>
            <ModalBar visible={modal} setVisible={setModal}>
                <TagModalContent tag={null} setVisible={setModal} setTags={setTags}/>
            </ModalBar>

            <div className='table__title'>
                <div className='label'>
                    <h1>Tags</h1>
                </div>
          
                <div className='add-tag' onClick={() => {setModal(true)}}>
                    +
                </div>
            </div>

            <div className='list'>
                {tags.map((tag) => 
                    <div className="tag-table-container">
                        <Tag tag={tag} setTags={setTags}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TagsTable;