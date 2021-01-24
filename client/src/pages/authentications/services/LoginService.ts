import { HttpClientProvider } from '../../../providers/HttpClientProvider';
import { FormState } from '../../../providers/FormProvider';
import Cookies from 'universal-cookie';
/*
  |--------------------------------------------------------------------------
  | Request access to the platform
  |--------------------------------------------------------------------------
  | attempt sign in
  |
  */
const LoginService = async (formState: FormState) => {
    const url = '/auth';

    // submit data
    const { setLoading, setError, values } = formState;

    // indicate loading state
    setLoading(true);

    HttpClientProvider.post(url, values)
        .then(({ data }) => {
            console.log(data);

            // set access token using cookies
            const cookies = new Cookies();
            cookies.set('access_token', data.token);

            // stop loader
            setLoading(false);

            // navigate to home page
            window.location.replace('/');
        })
        .catch((err) => {
            console.error(err.response);

            const { data } = err.response;
            // stop loader
            setLoading(false);

            setError({
                ...data,
            });
        });
};

export default LoginService;
