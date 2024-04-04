import React from 'react';

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
        <div className=''>
            {list.map((item) => 
            <div className=''>
                <div className=''>
                    {parseDate(item.date)}
                </div>
                {item.tasks.map(task =>
                    <div className='' onClick={() => {
                        setList(list.map((item) => {
                            return {"date":item.date, "tasks": item.tasks.filter(t => t !== task)}
                        }
                        ))
                    }}>
                        {/* DoneTask component */}
                        {task.title} 
                    </div>
                )}
            </div>
            )}
        </div>
    );
};

export default DoneTaskList;