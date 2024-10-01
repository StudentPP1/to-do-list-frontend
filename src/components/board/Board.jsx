import React, { useContext, useState } from 'react';
import './Board.css'
import Task from '../task/Task';
import AddTask from '../addtask/AddTask';
import plus from '../../images/plus.png'
import TaskService from '../../API/TaskService';
import {AuthContext} from "../../context";

const Board = ({
  currentBoard, 
  setCurrentBoard, 
  currentItem, 
  setCurrentItem, 
  boards,
  setBoards, 
  board,
  tags,
  allowAddTask,
  updateDates,
  changeDate,
  overdue,
  drag,
  setDrag,
  setDraggable,
  draggable}) => {
    const {isLoading, setLoading} = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    
    console.log("boards: ", boards)

    for (let i = 0; i < boards.length; i += 1) {
      if (boards[i].items == null) {
        boards[i].items = [];
      }
    }
    if (board == null) {
      board = {
        id: 1, 
        title: '', 
        items: []}
    }
    if (board.items == null) {
      board.items = [];
    }

    var insertBeforeTask = false;
    var beforeTask = null;
    var selected;
    updateDates.map((date) => {if (date.title_date == board.title) {
      selected = changeDate(date.date)
    }})

    const sortTasks = (a, b) => {
      if (a.order > b.order) {
        return 1
      }
      else {
        return -1
      }
  }
  
    function dragStartHandler(e, board, item) {
      if (e.target.className == 'task') { 
        e.target.style.boxShadow = 'none' 
      }
        setCurrentBoard(board)
        setCurrentItem(item)
        setDrag(false)
    }
  
    function dragLeaveHandler(e) {
      if (e.target.className == 'task') { 
        e.target.style.boxShadow = 'none' 
      }
    }
  
    function dragEndHandler(e) {
      if (e.target.className == 'task') { 
        e.target.style.boxShadow = 'none' 
      }
    }
  
    function dragOverHandler(e) {
      e.preventDefault()
      if (e.target.className == 'task') { 
        e.target.style.boxShadow = '0 2px 0 #9D331F' 
      }
    }
  
    function dropHandler(e, board, item) {
      insertBeforeTask = true
      beforeTask = item;
      e.preventDefault()
      if (e.target.className == 'task') { 
        e.target.style.boxShadow = 'none' 
      }
    }
  
    function dropCardHandler(e, board) {
      setLoading(true)
      if (e.target.className == 'task') { 
        e.target.style.boxShadow = 'none' 
      }

      if (board.id != -1) {
        const currentIndex = currentBoard.items.indexOf(currentItem) 
        currentBoard.items.splice(currentIndex, 1) 

        if (currentBoard.items.length > 0) {
          currentBoard.items.slice(currentIndex).map(item =>
            item.order -= 1)
        }

        var newDate;

        if (insertBeforeTask) {
          updateDates.map((date) => {
            if (date.title_date == board.title) {
              newDate = changeDate(date.date)
            }
          })
          currentItem.date = newDate
          board.items.splice(beforeTask.order, 0, currentItem)
          
          board.items.map(item => {
            item.order = board.items.indexOf(item) + 1
          })
        }
        else {
          updateDates.map((date) => {
            if (date.title_date == board.title) {
              newDate = changeDate(date.date)
            }
          })
          currentItem.date = newDate
          board.items.splice(0, 0, currentItem)
          
          board.items.map(item => {
            item.order = board.items.indexOf(item) + 1
          })
        }

        console.log("currentBoard", currentBoard.title, currentBoard.items)
        console.log("board", board.title, board.items)

        TaskService.updateSomeTask(board.items).then(() => {
          console.log("updated")
        })
        TaskService.updateSomeTask(currentBoard.items).then(() => {
          console.log("updated")
        })
        
        setBoards(boards.map(b => {
          if (b.id === board.id) {
            return board
          }
          if (b.id === currentBoard.id) {
            return currentBoard
          }
          return b
        }))
      }
      setLoading(false)
      setDrag(true)
    }
    
    console.log(draggable, board)
    return (
        <div 
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className='board'
            >
              <div className='board__title'>{board.title}</div>
             
              {board.items.sort(sortTasks).map(item =>
                <div 
                onDragStart={(e) => dragStartHandler(e, board, item)} 
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)} 
                onDragOver={(e) => dragOverHandler(e)} 
                onDrop={(e) => dropHandler(e, board, item)} 
                draggable={draggable} // true
                className='item'
                >
                  <Task 
                  isDrag={drag}
                  task={item} 
                  all_tags={tags} 
                  setTasks={setBoards}
                  updateDate={updateDates}
                  changeDate={changeDate}
                  overdue={overdue}
                  selected={selected}
                  tasks={boards}
                  setDraggable={setDraggable}
                  />
                </div>
          )}
            {allowAddTask
            ?
            <div>
              <button className="add-task" onClick={(e) => {
                setModal(!modal)
              }}>
                    <div>
                        <img src={plus} alt=""/>
                    </div>
                    <span>
                        Add task
                    </span>
            </button>
            
            <AddTask 
              tags={tags} 
              visible={modal} 
              setVisible={setModal} 
              tasks={board.items} 
              parentTask={null} 
              setTasks={setBoards}
              updateDate={updateDates}
              changeDate={changeDate}
              selected={selected}
            />
            </div>
            :
            <div></div>
            }
    
        </div>
    );
};

export default Board;