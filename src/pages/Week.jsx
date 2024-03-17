import React, { useState } from 'react';
import Sidebar from '../components/UI/sidebar/Sidebar';
import '../styles/Week.css'
import Board from '../components/board/Board';

const Week = () => {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var addToNextMonday = [1, 7, 6, 5, 4, 3, 2]
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
    var i = 1;
    const tag_list = [
      {name: "home", color: "red"},
      {name: "school", color: "gray"},
      {name: "relax", color: "green"},
      {name: "important", color: "blue"},
      {name: "walk", color: "purple"},
      {name: "event", color: "pink"},
    ]

    const setWeek = (today) => {
      var dd = String(today.getDate()).padStart(2, '0');
      var month = monthNames[today.getMonth()]
      var mm = String(today.getMonth() + 1).padStart(2, '0'); 
      var yyyy = today.getFullYear();
      var currentDayOfWeek = daysOfWeek[today.getDay()]

      var date = mm + '/' + dd + '/' + yyyy
      var title_date = dd + ' ' + month + ' ‧ ' + currentDayOfWeek
      var new_dates = [{date: date, title_date: title_date}]
     
      var tomorrow = new Date(today);
      
      while (currentDayOfWeek != 'Sunday') {
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
   
        dd = String(tomorrow.getDate()).padStart(2, '0');
        mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); 
        yyyy = tomorrow.getFullYear();
        date = mm + '/' + dd + '/' + yyyy
  
        month = monthNames[tomorrow.getMonth()]
        currentDayOfWeek = daysOfWeek[tomorrow.getDay()]
        title_date = dd + ' ' + month + ' ‧ ' + currentDayOfWeek
     
        new_dates.push({date: date, title_date: title_date})
     
      }
      return new_dates
    }
    
    const [currentDay, setCurrentDay] = useState(new Date())
    const [previousAdd, setPreviousAdd] = useState([])
    var dates = setWeek(new Date())
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    
    var all_tasks = new Map();
    dates.map((date) => all_tasks.set(date.date,  [
    {
    id: dates.indexOf(date) + 1,
    name: "test1", 
    description: "some desc", 
    tags: 
    [
      {name: "important", color: "blue"},
      {name: "home", color: "red"},
    ], 
    date: date.date,
    order: 1,
    sub_tasks: []
    },
    {
      id: dates.indexOf(date) + 2,
      name: "test2", 
      description: "some desc", 
      tags: 
      [
        {name: "home", color: "red"},
      ], 
      date: date.date,
      order: 2,
      sub_tasks: []
      }
  ],)
    )

    const [tasks, setTasks] = useState(dates.map((date) => all_tasks.get(date.date)))
    const [done_tasks, setDoneTasks] = useState([])
    const [boards, setBoards] = useState(
      dates.map((date) => {
        return {
          id: dates.indexOf(date) + 1, 
          title: date.title_date, 
          items: all_tasks.get(date.date)
        }
      })
    )

    const setNewWeek = (next) => {
      if (next) {
        var add = addToNextMonday[currentDay.getDay()]
        setPreviousAdd([...previousAdd, add])
        currentDay.setUTCDate(currentDay.getUTCDate() + add);
        setCurrentDay(currentDay)  
      }
      else {
        if (currentDay.getDate() != new Date().getDate()) {
          currentDay.setUTCDate(currentDay.getUTCDate() - previousAdd[previousAdd.length-1]);
          setCurrentDay(currentDay)  
          setPreviousAdd(previousAdd.slice(0, previousAdd.length-1))
        }
      }
      dates = setWeek(currentDay)
      
      all_tasks = new Map()
      dates.map((date) => all_tasks.set(date.date,  [
        {
        id: dates.indexOf(date) + 1,
        name: "test1", 
        description: "some desc", 
        tags: 
        [
          {name: "important", color: "blue"},
          {name: "home", color: "red"},
        ], 
        date: date.date,
        order: 1,
        sub_tasks: []
        },
        {
          id: dates.indexOf(date) + 2,
          name: "test2", 
          description: "some desc", 
          tags: 
          [
            {name: "home", color: "red"},
          ], 
          date: date.date,
          order: 2,
          sub_tasks: []
          }
      ],)
      )
      setTasks(dates.map((date) => all_tasks.get(date.date)))
      setBoards(dates.map((date) => {
        return {
          id: dates.indexOf(date) + 1, 
          title: date.title_date, 
          items: all_tasks.get(date.date)
        }
      
      }))
    }


    return (
        <div>
            <Sidebar/>
            <div className='week-table'>
              <div className='buttons-table'>
                <button className='week-switch-button' onClick={() => {setNewWeek(false)}}>
                  <span>{'<'}</span>
                </button >

                <button className='week-switch-button' onClick={() => {setNewWeek(true)}}>
                  <span>{'>'}</span>
                </button>
              </div>
            {boards.map((board) => 
              <Board 
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              boards={boards}
              setBoards={setBoards}
              board={board}
              done_tasks={done_tasks}
              setDoneTasks={setDoneTasks}
              tag_list={tag_list}
              tasks={tasks}
              setTasks={setTasks}
              />
            )}
            </div>
        </div>
    );
};

export default Week;