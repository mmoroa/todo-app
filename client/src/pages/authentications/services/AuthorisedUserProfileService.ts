import { HttpClientProvider } from '../../../providers/HttpClientProvider';

interface Props {
    setLoader: any;
    setError: any;
    setAuth: any;
}

const AuthorisedUserProfileService = async ({ setLoader, setError, setAuth }: Props) => {
    setLoader(true);
    HttpClientProvider.get('/auth/me')
        .then((res) => {
            console.log(res.data);
            setLoader(false);
            setAuth(res.data);
        })
        .catch((err) => {
            setLoader(false);
            const { data } = err.response;
            console.log(data);
            setError(data);
        });
};

export default AuthorisedUserProfileService;
