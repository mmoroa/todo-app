import { useCookies } from 'react-cookie';

const TOKEN_NAME = 'access_token';

const useAccessTokenProvider = () => {
    // use react-cookies to access our cookie
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

    // save any string in cookie, under 'authToken'
    const setAuthToken = (authToken: string) => setCookie(TOKEN_NAME, authToken);
    // remove the key "access_token" from our cookies.
    const removeAuthToken = () => removeCookie(TOKEN_NAME);

    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};

export default useAccessTokenProvider;
