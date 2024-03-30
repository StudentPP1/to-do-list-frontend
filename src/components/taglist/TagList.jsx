import React, { useContext, useEffect, useState } from 'react';
import TaskTag from '../tasktag/TaskTag';
import './TagList.css'
import Loader from '../UI/loader/Loader'
import {AuthContext} from "../../context";

const TagList = (props) => {
    const {isLoading, setLoading} = useContext(AuthContext);

    const [checkboxes, setCheckboxes] = useState(() =>
    {
        props.all_tags.map(function(tag) {
            if (props.tags != null && props.tags.map(t => t.name).indexOf(tag.name) > -1 )  {
                return {name: tag.name, color: tag.color, isChecked: true}
            }
            else {
                return {name: tag.name, color: tag.color, isChecked: false}
            }
        })
    }
    )
  
    const update = () => {
        setCheckboxes(
            props.all_tags.map(function(tag) {
                if (props.tags != null && props.tags.map(t => t.name).indexOf(tag.name) > -1 )  {
                    return {name: tag.name, color: tag.color, isChecked: true}
                }
                else {
                    return {name: tag.name, color: tag.color, isChecked: false}
                }
            })
        );
    }

    const [old_checkboxes, setOldCheckboxes] = useState([]);

    const handleCheckboxClick = (name) => {
        setOldCheckboxes([...checkboxes])

        setCheckboxes(prevState =>
          prevState.map(checkbox =>
            checkbox.name === name ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
          )
        );

        const list_check = checkboxes.map(checkbox =>
            checkbox.name === name ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
          ).map((e) => e.isChecked)

        const new_task_tags = []

        for (let step = 0; step < list_check.length; step++) {
            if (list_check[step]) {
                new_task_tags.push(props.all_tags[step])
            }
        }
 
        props.setTags(new_task_tags)
      };

    return (
        <div>
            <button className="select-tags" onClick={() => {
                if (props.isTagsOpen) {
                    if (old_checkboxes != []) {
                        setCheckboxes([...old_checkboxes])
                    }

                    props.setTagsOpen(false);
                }
                else {
                    update();
                    props.setTagsOpen(true);
                }
                }}>
                Tags
            </button>
            {isLoading
            ?
            <Loader/>
            :
            <ul className={`tags-menu ${props.isTagsOpen ? 'open' : ''}`}>
            {checkboxes 
            ?
                checkboxes.map((tag) => 
                <li>
                    {
                        <TaskTag 
                        checked={tag.isChecked}
                        command={() => handleCheckboxClick(tag.name)}
                        tag={tag} 
                        />
                    }
                </li>
                )
            :
            <li></li>
            }
            </ul>
            }
        </div>
    );
};

export default TagList;