import { refreshToken } from '../utils/RefreshTokens';

const OAuth2RedirectHandler = () => {
    refreshToken().then(() => {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        sleep(1000).then(() => {
            window.location.href = "/Today";
        })
    })
}

export default OAuth2RedirectHandler;
