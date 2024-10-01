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
          url: `${process.env.BACKEND_URL}/user/getTasksByDate`,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
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
        let response = await fetch(`${process.env.BACKEND_URL}/user/getTasks`,
         {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token'))
            },
          }
          );
     
        return await response.json()
    }

    static async addTask(title, description, date, tags, parentId, order) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}/user/addTask`,
        headers: {
          'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
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

    static async deleteTask(taskId, date) {
      console.log(date)
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}/user/deleteTask?taskId=` + taskId + "&date=" + date,
        headers: { 
          'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token'))
        },
        data : ''
      };
      
    const response = axios.request(config)
  
    return (await response).data
    }

    static async doneTask(taskId, date) {
      let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.BACKEND_URL}/user/doneTask?taskId=` + taskId + "&date=" + date,
          headers: { 
            'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token'))
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
        url: `${process.env.BACKEND_URL}/tasks/get?taskId=` + taskId,
        headers: { 
          'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token'))
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
        url: `${process.env.BACKEND_URL}/tasks/update?taskId=` + taskId,
        headers: {
          'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
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
          url: `${process.env.BACKEND_URL}/tasks/getAll`,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
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
          url: `${process.env.BACKEND_URL}/user/getOverdueTasks?date=` + overdueDate,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
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
        url: `${process.env.BACKEND_URL}/tasks/updateSome`,
        headers: {
          'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
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
        url: `${process.env.BACKEND_URL}/user/getDoneTasks`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
        },
        data: data
      }
        
      const response = axios.request(config)
      
      return (await response).data
    } catch (error) {
      return []
    }
    }

    static async replaceTaskToActive(taskId, date) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.BACKEND_URL}/user/replaceTaskToActive?taskId=` + taskId + '&date=' + date,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token')),
        },
        data: ''
      }
        
      const response = axios.request(config)
      
      return (await response).data
    }
}