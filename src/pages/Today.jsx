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
  var today = new Date().toLocaleString();
  const temp = today.split('.')
  today = temp[2].split(',')[0] + '-' + temp[1].padStart(2, '0') + '-' + temp[0].padStart(2, '0')

  const [tags, setTags] = useState([])
  useEffect(() => {
    setLoading(true)
    TagService.getTags().then((data) => {
      setTags(data)
    }).then(() => {
      setLoading(false)
    })
   }, [])
  
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    setLoading(true)
    TaskService.getTasksByDate(today).then((data) => {
      setTasks(data)
    }).then(() => {
      setLoading(false)
    })
   }, [])
  // it can be list of dates instead of just today
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
      updateDate={today}
      tasks={tasks} 
      setTasks={setTasks} 
      tags={tags} 
      title="Today"/>
      }
    </div>
  );
}

export default Today;