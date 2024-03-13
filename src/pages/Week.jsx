import React, { useState } from 'react';
import Sidebar from '../components/UI/sidebar/Sidebar';
import '../styles/Week.css'
import Task from '../components/task/Task'

const Week = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    let tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    dd = String(tomorrow.getDate()).padStart(2, '0');
    mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); 
    yyyy = tomorrow.getFullYear();
    tomorrow = mm + '/' + dd + '/' + yyyy;
    
    var all_tasks = new Map();
    all_tasks.set(today,  [{
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
        sub_tasks: []
      }],);
    all_tasks.set(tomorrow,  [{
        id: 2,
        name: "test1", 
        description: "some desc", 
        tags: 
        [
          {name: "important", color: "blue"},
        ], 
        date: tomorrow,
        order: 1,
        sub_tasks: []
      }],);
  
    const tag_list = [
      {name: "home", color: "red"},
      {name: "school", color: "gray"},
      {name: "relax", color: "green"},
      {name: "important", color: "blue"},
      {name: "walk", color: "purple"},
      {name: "event", color: "pink"},
    ]
  
    const [tasks, setTasks] = useState([all_tasks.get(today), all_tasks.get(tomorrow)])
    const [done_tasks, setDoneTasks] = useState([])
    
    const [boards, setBoards] = useState([
      {id: 1, title: today, items: tasks[0]},
      {id: 2, title: tomorrow, items: tasks[1]},
    ])
  
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
  
    function dragStartHandler(e, board, item) {
      setCurrentBoard(board)
      setCurrentItem(item)
    }
  
    function dragLeaveHandler(e) {
      e.target.style.boxShadow = 'none' 
    }
  
    function dragEndHandler(e) {
      e.target.style.boxShadow = 'none' 
    }
  
    function dragOverHandler(e) {
      e.preventDefault() 
      if (e.target.className == 'item') { 
        e.target.style.boxShadow = '0 4px 3px gray'
      }
    }
  
    function dropHandler(e, board, item) {
      e.preventDefault()
    }
  
    function dropCardHandler(e, board) {
      board.items.push(currentItem)
      const currentIndex = currentBoard.items.indexOf(currentItem) 
      currentBoard.items.splice(currentIndex, 1) 
      setBoards(boards.map(b => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }))
      e.target.style.boxShadow = 'none' 
    }

    return (
        <div>
            <Sidebar/>
            <div className='week-table'>
            {boards.map(board => 
        <div 
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropCardHandler(e, board)}
        className='board'>
          <div className='board__title'>{board.title}</div>
          {board.items.map(item =>
            <div 
              onDragStart={(e) => dragStartHandler(e, board, item)} 
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)} 
              onDragOver={(e) => dragOverHandler(e)} 
              onDrop={(e) => dropHandler(e, board, item)} 
              draggable={true} 
            >
                <Task boards={boards} setBoards={setBoards} done_tasks={done_tasks} setDoneTasks={setDoneTasks} task={item} all_tags={tag_list} tasks={tasks} setTasks={setTasks}/>
              </div>
          )}
        </div>
      )}
            </div>
        </div>
    );
};

export default Week;