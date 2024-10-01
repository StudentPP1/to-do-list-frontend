import UserService from "../API/UserService"

export async function RefreshTokens () {
    UserService.refreshToken(String(localStorage.getItem('refresh_token'))).then((tokens) => {
        console.log("new_tokens", tokens)
        localStorage.setItem('access_token', tokens.access_token)
        localStorage.setItem('refresh_token', tokens.refresh_token)
    })
}