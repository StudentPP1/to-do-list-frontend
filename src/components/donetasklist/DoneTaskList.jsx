import React from 'react';
import './DoneTaskList.css'
import DoneTask from '../donetask/DoneTask';

const DoneTaskList = ({list, setList}) => {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]

    if (list == null) {
        list = []
    }
    
    const parseDate = (date) => {
        var parse = new Date(date);
        var dd = String(parse.getDate());
        var month = monthNames[parse.getMonth()]
        var currentDayOfWeek = daysOfWeek[parse.getDay()]
        return dd + ' ' + month + ' ‧ ' + currentDayOfWeek
    }

    console.log("done tasks: ", list)

    return (
        <div className='task-list-body'>

            {list.map((item) => 
            <div className='board'>
                
                <div className="board__title">
                    {parseDate(item.date)}   
                </div>
                {item.tasks.map(task =>
                    <div className='done-item'>
                        <DoneTask task={task} list={list} setList={setList}/>
                    </div>
                )}
            </div>
            )}
            
        </div>
    );
};

export default DoneTaskList;