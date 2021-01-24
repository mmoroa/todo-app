import { RoleRepository, UserRepository } from '../../database/repository';
import {
    DEFAULT_INTERNAL_ERROR_MESSAGE,
    DEFAULT_NOT_FOUND_ERROR_MESSAGE,
    DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
} from '../../util/constant';

const UserProfileService = async (req, res) => {
    const { id: authId, roleId } = req.user;
    const { id: userId } = req.params;

    if (!authId || !userId) {
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {
                id: 'invalid user id',
            },
        });
    }

    // retrieve user details
    const data = await UserRepository.findByIdWithTask(userId).catch((err) => {
        // throw a exception
        console.error(err.message);
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {},
        });
    });

    if (data) {
        return res.status(200).send({ ...data });
    }

    // user not found
    return res.status(404).send({
        message: DEFAULT_NOT_FOUND_ERROR_MESSAGE,
        data: [],
    });
};

export default UserProfileService;
