import React, { useState } from 'react';
import './Board.css'
import Task from '../task/Task';
import AddTask from '../addtask/AddTask';
import plus from '../../images/plus.png'

const Board = ({currentBoard, setCurrentBoard, currentItem, setCurrentItem, boards, setBoards, board, done_tasks, setDoneTasks, tag_list, tasks, setTasks}) => {

    const [modal, setModal] = useState(false);

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
        e.target.style.boxShadow = '0 2px 0 #9D331F' 
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
        <div 
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className='board'
            >
              <div className='board__title'>{board.title}</div>
              
              {board.items.map(item =>
                <div 
                onDragStart={(e) => dragStartHandler(e, board, item)} 
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)} 
                onDragOver={(e) => dragOverHandler(e)} 
                onDrop={(e) => dropHandler(e, board, item)} 
                draggable={true} 
                className='item'
                >
                  <Task 
                  boards={boards} 
                  setBoards={setBoards} 
                  done_tasks={done_tasks} 
                  setDoneTasks={setDoneTasks} 
                  task={item} 
                  all_tags={tag_list} 
                  tasks={tasks} 
                  setTasks={setTasks}
                  />
                </div>
          )}
 
            <button className="add-task" onClick={() => setModal(!modal)}>
                    <div>
                        <img src={plus} alt=""/>
                    </div>
                    <span>
                        Add task
                    </span>
              </button>
            
              <AddTask 
              tags={tag_list} 
              visible={modal} 
              setVisible={setModal} 
              tasks={tasks} 
              parentTask={null} 
              setTasks={setTasks}
              board={board}
              boards={boards}
              setBoards={setBoards}
              />
    
            </div>
    );
};

export default Board;