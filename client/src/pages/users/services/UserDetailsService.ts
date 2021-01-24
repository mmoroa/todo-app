import { HttpClientProvider } from '../../../providers/HttpClientProvider';
import { Task } from '../../tasks/model/Task';
interface Props {
    setData: any;
    setLoader: any;
    values: number;
}

const UserDetailsService = async ({ setData, setLoader, values }: Props) => {
    // inputs.setLoader(true);
    const { data }: any = await HttpClientProvider.get(`/users/${values}`).catch((err) => {
        setLoader(false);
        const { data } = err.response;
        console.log(data);
    });

    console.log(data);

    if (data) {
        setData({
            ...data,
            role: data.role.name,
            tasks: data.tasks.map(
                (it: any): Task => ({
                    isComplete: it.completedAt ? true : false,
                    description: it.description,
                    id: it.id,
                    title: it.title,
                    updatedAt: it.updatedAt,
                    createdAt: it.createdAt,
                    user: {
                        id: data.id,
                        email: data.email,
                        username: data.username,
                        role: data.role.name,
                        createdAt: data.createdAt,
                    },
                }),
            ),
        });
    }
    setLoader(false);
};

export default UserDetailsService;
