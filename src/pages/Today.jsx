import React, { useContext, useEffect, useState } from 'react'; 
import Sidebar from '../components/UI/sidebar/Sidebar';
import '../styles/Today.css'
import TaskList from '../components/tasklist/TaskList';
import TaskService from "../API/TaskService";
import TagService from '../API/TagService';
import {AuthContext} from "../context";
import Loader from '../components/UI/loader/Loader'

const Today = () => {
  const {isLoading, setLoading} = useContext(AuthContext);
  const [tags, setTags] = useState([])
  const [tasks, setTasks] = useState([])
  
  var today = new Date().toLocaleString();
  const temp = today.split('.')
  today = temp[2].split(',')[0] + '-' + temp[1].padStart(2, '0') + '-' + temp[0].padStart(2, '0')

  useEffect(() => {
    setLoading(true)
    TagService.getTags().then((data) => {
      setTags(data)
    }).then(() => {
      setLoading(false)
    })
   }, [])

  useEffect(() => {
    setLoading(true)
    TaskService.getTasksByDate([today]).then((data) => {
      setTasks(data.at(0))
    }).then(() => {
      setLoading(false)
    })
   }, [])
  
  return (
    <div className="today-page">
      <Sidebar/>
      {isLoading
      ?
      <div className="task-list-body">
        <Loader/>
      </div>
      :
      <TaskList 
      updateDate={[today]}
      tasks={tasks} 
      setTasks={setTasks} 
      tags={tags} 
      selected={today}
      title="Today"/>
      }
    </div>
  );
}

export default Today;