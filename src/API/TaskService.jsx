import axios from "axios";

export default class TaskService {

    static async getTasksByDate(dates) {
      try {
        let data = JSON.stringify({
          "dates": dates.map(date => String(date))
        });
      
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: '/user/getTasksByDate',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + String(localStorage.getItem('access_token')),
          },
          data: data
        }
          
        const response = axios.request(config)
        
        return (await response).data
      } catch (error) {
        return []
      }
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

    static async doneTask(taskId) {
      let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: '/user/doneTask?taskId=' + taskId,
          headers: { 
            'Authorization': 'Bearer ' + String(localStorage.getItem('access_token'))
          },
          data : ''
        };
        
      const response = axios.request(config)
    
      return (await response).data
    }

    static async getTask(taskId) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/tasks/get?taskId=' + taskId,
        headers: { 
          'Authorization': 'Bearer ' + String(localStorage.getItem('access_token'))
        },
        data : ''
      };
      
    const response = axios.request(config)
  
    return (await response).data
    }

    static async updateTask(taskId, title, description, date, tags, parentId, order) {

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/tasks/update?taskId=' + taskId,
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

    static async getAllTasks(tasksId) {
      try {
        let data = JSON.stringify({
          "tasks": tasksId.map(id => String(id))
        });
      
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: '/tasks/getAll',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + String(localStorage.getItem('access_token')),
          },
          data: data
        }
          
        const response = axios.request(config)
        
        return (await response).data
      } catch (error) {
        return []
      }
      
    }

    static async getOverdueTasks(overdueDate) {
      try {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: '/user/getOverdueTasks?date=' + overdueDate,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + String(localStorage.getItem('access_token')),
          },
          data: ''
        }
          
        const response = axios.request(config)
        
        return (await response).data
      } catch (error) {
        return []
      }
    }

    static async updateSomeTask(tasks) {
      
      var dataTasks = []
      tasks.forEach(t => {
        dataTasks.push({
          "id": String(t.id), 
          "title": t.title, 
          "description": t.description, 
          "date": t.date, 
          "tags": t.tagsId === null ? [] : t.tagsId, 
          "parentId": t.parentId,
          "order": t.order 
        })
      });

      console.log("send tasks: ", dataTasks)
      let data = JSON.stringify({
        "tasks": dataTasks
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/tasks/updateSome',
        headers: {
          'Authorization': 'Bearer ' + String(localStorage.getItem('access_token')),
          'Content-Type': 'application/json'
        },
        data: data
      };
      
      const response = axios.request(config)
      return (await response).data 

    }

    static async getDoneTasks(dates) {
    try {
      let data = JSON.stringify({
        "dates": dates.map(date => String(date))
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/user/getDoneTasks',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + String(localStorage.getItem('access_token')),
        },
        data: data
      }
        
      const response = axios.request(config)
      
      return (await response).data
    } catch (error) {
      return []
    }
    }
}