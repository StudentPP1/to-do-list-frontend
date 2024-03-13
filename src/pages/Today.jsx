import React, { useState } from 'react'; 
import Sidebar from '../components/UI/sidebar/Sidebar';
import '../styles/Today.css'
import TaskList from '../components/tasklist/TaskList';

function Main() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  const task_list = [
    {
      id: 1,
      name: "test", 
      description: "some desc", 
      tags: 
      [
        {name: "important", color: "blue"},
        {name: "home", color: "red"},
      ], 
      date: today,
      order: 1,
      sub_tasks: 
      [
        {
          id: 3,
          name: "sub_test1",
          description: "", 
          tags: 
          [
            {name: "important", color: "blue"},
            {name: "home", color: "red"}
          ],
          date: today,
          order: 1,
          sub_tasks: [
            {
              id: 4,
              name: "sub_sub_task",
              description: "bla-bla-bla", 
              tags: 
              [
                {name: "important", color: "blue"}
              ],
              date: today,
              order: 1,
              sub_tasks: []
            }
          ]
        }
      ]
    },
  
    {
      id: 2,
      name: "test2", 
      description: "", 
      tags: 
      [
        {name: "home", color: "red"}
      ],
      date: today,
      order: 2,
      sub_tasks: []
    }
  ]
  
  var all_tasks = new Map();
  all_tasks.set(today, task_list);

  const tag_list = [
    {name: "home", color: "red"},
    {name: "school", color: "gray"},
    {name: "relax", color: "green"},
    {name: "important", color: "blue"},
    {name: "walk", color: "purple"},
    {name: "event", color: "pink"},
  ]

  const done_task_list = []

  const [tasks, setTasks] = useState(all_tasks.get(today))
  const [done_tasks, setDoneTasks] = useState(done_task_list)
  
  return (
    <div className="main-page">
      <Sidebar/>
      <TaskList done_tasks={done_tasks} setDoneTasks={setDoneTasks} tasks={tasks} setTasks={setTasks} tags={tag_list} title="Today"/>
    </div>
  );
}

export default Main;