import axios from "axios";

export default class TagService {
    static async getTags() {
        let response = await fetch('/user/getTags',
         {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem('access_token'))
            },
          }
          );
     
        return await response.json()
    }

    static async getTag(tagId) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/tags/get?tagId=' + tagId,
            headers: { 
              'Authorization': 'Bearer ' + String(localStorage.getItem('access_token'))
            },
            data : ''
          };
          
        const response = axios.request(config)
      
        return (await response).data
    }

    static async getAllTags(tagsId) {
      try {
        let data = JSON.stringify({
          "tags": tagsId.map(id => String(id))
        });
       
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: '/tags/getAll',
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