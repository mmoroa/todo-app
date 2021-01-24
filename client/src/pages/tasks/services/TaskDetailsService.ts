import { HttpClientProvider } from '../../../providers/HttpClientProvider';
interface Props {
    setData: any;
    setLoader: any;
    values: number;
}

const TaskDetailsService = async ({ setData, setLoader, values }: Props) => {
    // inputs.setLoader(true);
    const { data }: any = await HttpClientProvider.get(`/todos/${values}`).catch((err) => {
        setLoader(false);
        const { data } = err.response;
        console.log(data);
    });

    console.log(data);

    if (data) {
        setData({
            ...data,
            isComplete: data.completedAt ? true : false,
        });
    }
    setLoader(false);
};

export default TaskDetailsService;
