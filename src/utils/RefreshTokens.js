import { API_BASE_URL } from "../constants"

export async function refreshToken () {
    await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    }).then(async (result) => {
        const token = await result.json();
        console.log(token)
        sessionStorage.setItem('access_token', token.access_token)
        sessionStorage.setItem('IsAuth', '1')
    }).catch((error) => {
        sessionStorage.clear();
        localStorage.clear();
    })
}