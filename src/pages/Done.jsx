import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/UI/sidebar/Sidebar';
import DoneTaskList from '../components/donetasklist/DoneTaskList';
import TaskService from '../API/TaskService';

const Done = () => {
    const [list, setList] = useState();
    const [dates, setDates] = useState([new Date(), 
        new Date(new Date().setUTCDate(new Date().getUTCDate() - 1)),
        new Date(new Date().setUTCDate(new Date().getUTCDate() - 2))]);
    const lastElement = useRef();
    const observer = useRef();

    const addDate = (times) => {
        let date = new Date(dates.at(dates.length - 1));
        for (let i=1; i <= times; i++) {
            dates.push(new Date(date.setUTCDate(date.getUTCDate() - 1)))
            setDates(dates)
        }
    }

    const sendDates = (dates) => {
        let send = []
        dates.forEach(date => {
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth() + 1).padStart(2, '0'); 
            let yyyy = date.getFullYear();
            send.push(yyyy + '-' + mm + '-' + dd)
        });
        return send
    }

    useEffect(() => {
        var send = sendDates(dates)
        TaskService.getDoneTasks(send).then((data) => {
            setList(send.map((date) => {
                return {"date": date, "tasks": data[date]}
            }))
        })
       }, [dates])
    
    useEffect(() => {
        var callback = function(entries, observer) {
            // addDate(3)
        }
        observer.current = new IntersectionObserver(callback)
        observer.current.observe(lastElement.current)
    })

    return (
        <div className='done-list-body'>
            <Sidebar/>
            <DoneTaskList list={list} setList={setList}/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
        </div>
    );
};

export default Done;