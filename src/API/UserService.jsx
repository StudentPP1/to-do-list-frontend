import axios from "axios";

export default class UserService {
  
    static async register(user_email, user_password) {
        const response = axios
            .post(
                "/auth/register", 
            {
                email: user_email,
                password: user_password
            },
            
            {
                headers: {
                    'Content-Type': "application/json"
                }
            });
        return (await response).data
    }

    static async auth(user_email, user_password) {
        let data = JSON.stringify({
            "email": user_email,
            "password": user_password
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/auth/auth',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          const response = axios.request(config)
          return (await response).data
    }

    static async refreshToken(token) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/auth/refresh-token',
            headers: { 
              'Authorization': 'Bearer ' + token
            }
          };
          
        const response = axios.request(config)
        return (await response).data
    }
}