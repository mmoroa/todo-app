import { HttpClientProvider } from '../../../providers/HttpClientProvider';
import { Task } from '../model/Task';

interface Props {
    setData: any;
    setLoader: any;
}

const TaskDirectoryService = async (inputs: Props) => {
    // inputs.setLoader(true);
    HttpClientProvider.get('/todos')
        .then((res) => {
            if (res && res.data) {
                const { data } = res;
                console.log(res.data);
                if (data.directory.length > 0) {
                    const { directory } = data;
                    const items = directory.map(
                        (it: any): Task => ({
                            isComplete: it.completedAt ? true : false,
                            description: it.description,
                            id: it.id,
                            title: it.title,
                            updatedAt: it.updatedAt,
                            createdAt: it.createdAt,
                            user: {
                                id: it.user.id,
                                email: it.user.email,
                                username: it.user.username,
                                role: it.user.role.name,
                                createdAt: it.user.createdAt,
                            },
                        }),
                    );
                    console.log(items);
                    inputs.setLoader(false);
                    inputs.setData(items);
                }
            }
        })
        .catch((err) => {
            console.log(err);
            inputs.setLoader(false);
            // const { data } = err.response;
        });
};

export default TaskDirectoryService;
