import React from 'react';
import './TaskDatePicker.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskDatePicker = (props) => {
    return (
        <div className="task__date">
            <span>Date</span>
            <DatePicker
            selected={props.currentDate}
            onChange={value => props.setDate(value)}
            minDate={props.currentDate}
            dateFormat="dd/MM/yyyy"
            />
        </div>
    );
};

export default TaskDatePicker;