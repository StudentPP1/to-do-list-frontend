import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/UI/sidebar/Sidebar';
import '../styles/Tags.css'
import TagService from '../API/TagService';
import TagsTable from '../components/tagstable/TagsTable';
import {AuthContext} from "../context";
import Loader from '../components/UI/loader/Loader'

const Tags = () => {
    const {isLoading, setLoading} = useContext(AuthContext);
    const [tags, setTags] = useState([])
    
    useEffect(() => {
    setLoading(true)
      TagService.getTags().then((data) => {
        setTags(data)
      }).then(() => {
        setLoading(false)
      })
     }, [])

    return (
        <div>
            <Sidebar/>
            {isLoading
            ?
            <Loader/>
            :
            <div className='tags-table'>
                <TagsTable tags={tags} setTags={setTags}/>
            </div>
            }
        </div>
    );
};

export default Tags;