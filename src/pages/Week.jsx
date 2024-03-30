import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/UI/sidebar/Sidebar';
import '../styles/Week.css'
import Board from '../components/board/Board';
import TagService from '../API/TagService';
import TaskService from '../API/TaskService';
import {AuthContext} from "../context";
import Loader from '../components/UI/loader/Loader'

const Week = () => {
    const {isLoading, setLoading} = useContext(AuthContext);
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var addToNextMonday = [1, 7, 6, 5, 4, 3, 2]
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

    const [tags, setTags] = useState([])
    useEffect(() => {
      TagService.getTags().then((data) => {
        setTags(data)
      })
     }, [])

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
    const [dates, setDates] = useState(setWeek(new Date()))
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const [boards, setBoards] = useState([])
    const [overdueBoard, setOverdueBoard] = useState(null)

    const changeDate = (date) => {
      var data = new Date(date).toLocaleString();
      const temp = data.split('.')
      data = temp[2].split(',')[0] + '-' + temp[1].padStart(2, '0') + '-' + temp[0].padStart(2, '0')
      return data
    }

    useEffect(() => {
      setLoading(true)
      TaskService.getTasksByDate(dates.map((date) => {return changeDate(date.date)})).then((tasks) => {
        setBoards(
          dates.map((date) => {
            return {
              id: dates.indexOf(date) + 1, 
              title: date.title_date, 
              items: tasks.at(dates.indexOf(date))
            }
          })
        )
      }).then(() => {
        if (currentDay.getDate() == new Date().getDate()) {
          TaskService.getOverdueTasks(changeDate(currentDay)).then((tasks) => {
            console.log("getOverdueTasks: ", tasks)
            if (tasks.length > 0) {
              setOverdueBoard({id: -1, title: "Overdue tasks", items: tasks})
            }
            else {
              setOverdueBoard(null)
            }
          })
        }
        setLoading(false)
      })
     }, [dates])

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
      setDates(setWeek(currentDay))
    }

    return (
        <div>
            <Sidebar/>
            {isLoading
            ?
            <Loader/>
            :
            <div className='week-table'>
              <div className='buttons-table'>
                <button className='week-switch-button' onClick={() => {setNewWeek(false)}}>
                  <span>{'<'}</span>
                </button >

                <button className='week-switch-button' onClick={() => {setNewWeek(true)}}>
                  <span>{'>'}</span>
                </button>
              </div>
            {currentDay.getDate() == new Date().getDate() && overdueBoard != null
            ?
            <Board 
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              boards={boards}
              board={overdueBoard}
              tags={tags}
              allowAddTask={false}
              updateDates={dates}
              changeDate={changeDate}
            />
            :
            <></>
            }
            {boards.map((board) => 
              <Board 
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              boards={boards}
              setBoards={setBoards}
              board={board}
              tags={tags}
              allowAddTask={true}
              updateDates={dates}
              changeDate={changeDate}
              />
            )}
            </div>
            }
        </div>
    );
};

export default Week;