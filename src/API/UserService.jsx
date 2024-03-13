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
}