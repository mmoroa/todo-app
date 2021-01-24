import { HttpClientProvider } from '../../../providers/HttpClientProvider';
import { TaskInput } from '../model/TaskInput';
interface Props {
    setData: any;
    setLoader: any;
    setError: any;
    values: TaskInput;
}

const AddTaskService = async ({ setData, setError, setLoader, values }: Props) => {
    setLoader(true);
    HttpClientProvider.post(`/todos`, values)
        .then((res) => {
            if (res && res.data) {
                setLoader(false);
                setData({
                    ...res.data,
                });

                window.location.assign('/');
            }
        })
        .catch((err) => {
            setLoader(false);
            const { data } = err.response;
            console.error(data);
            setError(data);
        });
};

export default AddTaskService;
