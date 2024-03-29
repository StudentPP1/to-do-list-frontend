import React, { useState } from 'react';
import './Board.css'
import Task from '../task/Task';
import AddTask from '../addtask/AddTask';
import plus from '../../images/plus.png'

const Board = ({
  currentBoard, 
  setCurrentBoard, 
  currentItem, 
  setCurrentItem, 
  boards,
  setBoards, 
  board,
  tags}) => {
    console.log("boards: ", boards)
    if (board == null) {
      board = {
        id: 1, 
        title: '', 
        items: []}
    }
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
                  setBoards={setBoards} 
                  task={item} 
                  all_tags={tags} 
                  setTasks={setBoards}
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
              tags={tags} 
              visible={modal} 
              setVisible={setModal} 
              tasks={board.items} 
              parentTask={null} 
              setTasks={setBoards}
              />
    
        </div>
    );
};

export default Board;