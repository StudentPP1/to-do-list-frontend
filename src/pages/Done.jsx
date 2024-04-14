import React, { useContext, useEffect, useRef, useState } from 'react';
import Sidebar from '../components/UI/sidebar/Sidebar';
import DoneTaskList from '../components/donetasklist/DoneTaskList';
import TaskService from '../API/TaskService';
import '../styles/Done.css'
import {useObserver} from "../hooks/useObserver";
import Loader from '../components/UI/loader/Loader'
import UserService from '../API/UserService';

const Done = () => {
    const [isLoading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [dates, setDates] = useState([new Date()]);
    const lastElement = useRef();

    const addDate = (times) => {
        let new_dates = dates
        let date = new Date(dates.at(dates.length - 1));

        for (let i=1; i <= times; i++) {
            new_dates.push(new Date(date.setUTCDate(date.getUTCDate() - 1)))
        }
        setDates(new_dates)
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

    useObserver(lastElement, isLoading, () => {
        addDate(6)
        var send = sendDates(dates)
        setLoading(true)
        TaskService.getDoneTasks(send).then((data) => {
            setList(send.map((date) => {
                if (data[date] == null) {
                    return {"date": date, "tasks": []}
                }
                else {
                    return {"date": date, "tasks": data[date]}
                }
            }))   
        }).then(() => setLoading(false))
    })

    return (
        <div className='done-table'>
            <Sidebar/>
            <div>
                <DoneTaskList list={list} setList={setList} dates={dates} sendDates={sendDates}/>
                {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
                }
                <div ref={lastElement} className='last'/>
            </div>
        </div>
    );
};

export default Done;