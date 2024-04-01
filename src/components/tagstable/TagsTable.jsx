import React from 'react';
import Tag from '../tag/Tag';
import './TagsTable.css'

const TagsTable = ({tags, setTags}) => {
    console.log("tags: ", tags)
    
    return (
        <div className='table'>
            <div className='table__title'>
                <div className='label'>
                    <h1>Tags</h1>
                </div>
          
                <div className='add-tag'>
                    +
                </div>
            </div>

            <div className='list'>
                {tags.map((tag) => 
                    <div className="tag-container">
                        <Tag tag={tag} setTags={setTags}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TagsTable;