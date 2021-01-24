import { HttpClientProvider } from '../../../providers/HttpClientProvider';
import { User } from '../model/User';

interface Props {
    setData: any;
    setLoader: any;
}

const UserDirectoryService = async (inputs: Props) => {
    // inputs.setLoader(true);
    const { data }: any = await HttpClientProvider.get('/users').catch((err) => {
        inputs.setLoader(false);
        const { data } = err.response;
        console.log(data);
    });

    if (data && data?.directory?.length > 0) {
        const items: User[] = data.directory.map(
            (it: any): User => ({
                ...it,
                role: it.role.name,
            }),
        );

        inputs.setLoader(false);
        inputs.setData(items);
    }
};

export default UserDirectoryService;
