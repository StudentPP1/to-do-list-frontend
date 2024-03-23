import axios from "axios";

export default class TaskService {

    static async getTasksByDate(date) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/user/getTasksByDate?date=' + date,
            headers: { 
              'Authorization': 'Bearer ' + String(localStorage.getItem('access_token'))
            },
            data : ''
          };
          
        const response = axios.request(config)
      
        return (await response).data
    }

    static async getTasks() {
        let response = await fetch('/user/getTasks',
         {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem('access_token'))
            },
          }
          );
     
        return await response.json()
    }

    static async addTask(title, description, date, tags, parentId, order) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/user/addTask',
        headers: {
          'Authorization': 'Bearer ' + String(localStorage.getItem('access_token')),
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
          title: title, 
          description: description, 
          date: date, 
          tags: tags, 
          parentId: parentId,
          order: order})
      };
      
      const response = axios.request(config)
      return (await response).data
    }

    static async deleteTask(taskId) {
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: '/user/deleteTask?taskId=' + taskId,
        headers: { 
          'Authorization': 'Bearer ' + String(localStorage.getItem('access_token'))
        },
        data : ''
      };
      
    const response = axios.request(config)
  
    return (await response).data
    }
}