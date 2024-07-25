// http://localhost:8080
export const API_BASE_URL = "https://to-do-list-backend-2.onrender.com";

export const ACCESS_TOKEN = "accessToken";

// http://localhost:3000/oauth2/redirect
export const OAUTH2_REDIRECT_URI = "https://to-do-list-frontend-wj7x.onrender.com/oauth2/redirect";

export const GITHUB_AUTH_URL = API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;

export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;