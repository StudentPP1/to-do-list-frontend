import axios from "axios";
import {GOOGLE_AUTH_URL} from "../constants/index"
import {GITHUB_AUTH_URL} from "../constants/index"

export default class UserService {
    static async register(username, email, password) {
        try {
            const response = axios
                .post(
                    `${process.env.BACKEND_URL}/auth/register`,
                    {
                        email: email,
                        password: password,
                        username: username,
                    },

                    {
                        headers: {
                            'Content-Type': "application/json",
                            'Access-Control-Allow-Origin' : '*',
                        }
                    });

            return (await response).data
        }
        catch(error) {
            return null
        }
    }

    static async auth(email, password) {
        const response = axios
            .post(
                `${process.env.BACKEND_URL}/auth/auth`,
                {
                    email: email,
                    password: password
                },

                {
                    headers: {
                        'Content-Type': "application/json",
                        'Access-Control-Allow-Origin' : '*',
                    }
                });

        return (await response).data
    }

    static async google(){
        window.location.href = GOOGLE_AUTH_URL;
    }

    static async forgotPassword(email) {
        try {
            const response = axios
                .post(
                    `${process.env.BACKEND_URL}/auth/password-reset-query`,
                    {
                        email: email
                    },
                    {
                        headers: {
                            'Content-Type': "application/json",
                            'Access-Control-Allow-Origin' : '*',
                        }
                    });

            return (await response).data
        } catch (e) {
            return null
        }
    }

    static async activateAccount(code) {
        const response = axios
            .post(
                `${process.env.BACKEND_URL}/auth/activate-account?token=` + code,
                {
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                    }
                });

        return (await response).data
    }

    static async resetPassword(newPassword, confirmPassword, code) {
        const response = axios
            .post(
                `${process.env.BACKEND_URL}/auth/reset-password?token=` + code,
                {
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                },
                {
                    headers: {
                        'Content-Type': "application/json",
                        'Access-Control-Allow-Origin' : '*',
                    }
                });

        return (await response).data
    }

    static async refreshToken(token) {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.BACKEND_URL}/auth/refresh-token`,
            headers: { 
              'Authorization': 'Bearer ' + token
            }
          };
          
        const response = axios.request(config)
        return (await response).data
    }

    static async logout() {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.BACKEND_URL}/logout`,
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem('refresh_token'))
            }
        };

        const response = axios.request(config)
        return (await response).data
    }
}