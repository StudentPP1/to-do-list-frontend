import React, { useEffect, useState } from 'react'; 
import Sidebar from '../components/UI/sidebar/Sidebar';
import '../styles/Today.css'
import TaskList from '../components/tasklist/TaskList';
import TaskService from "../API/TaskService";

const Today = () => {
  var today = new Date().toLocaleString();
  const temp = today.split('.')
  today = temp[2].split(',')[0] + '-' + temp[1].padStart(2, '0') + '-' + temp[0].padStart(2, '0')

  const tag_list = [
    {name: "home", color: "red"},
    {name: "school", color: "gray"},
    {name: "relax", color: "green"},
    {name: "important", color: "blue"},
    {name: "walk", color: "purple"},
    {name: "event", color: "pink"},
  ]

  const [tasks, setTasks] = useState(null)
  useEffect(() => {
    TaskService.getTasksByDate(today).then((data) => {
      setTasks(data)
    })
   }, [])
  
  const [done_tasks, setDoneTasks] = useState([])

  return (
    <div className="today-page">
      <Sidebar/>
      <TaskList done_tasks={done_tasks} setDoneTasks={setDoneTasks} tasks={tasks} setTasks={setTasks} tags={tag_list} title="Today"/>
    </div>
  );
}

export default Today;