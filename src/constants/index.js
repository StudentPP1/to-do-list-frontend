export const API_BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_URI = `${process.env.REACT_APP_FRONTEND_URL}/oauth2/redirect`;

export const GITHUB_AUTH_URL = API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;

export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;