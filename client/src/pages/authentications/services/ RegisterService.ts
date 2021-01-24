import { FormState } from '../../../providers/FormProvider';
import { HttpClientProvider } from '../../../providers/HttpClientProvider';

const RegisterService = async (formState: FormState) => {
    const url = '/auth/register';

    // submit data
    const { setLoading, setError, values, setSuccess } = formState;

    // indicate loading state
    setLoading(true);

    HttpClientProvider.post(url, values)
        .then(({ data }) => {
            console.log(data);

            setSuccess(true);
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

export default RegisterService;
