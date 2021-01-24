import { RoleRepository, UserRepository } from '../../database/repository';
import {
    DEFAULT_INTERNAL_ERROR_MESSAGE,
    DEFAULT_NOT_FOUND_ERROR_MESSAGE,
    DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
} from '../../util/constant';

const UserDirectoryService = async (req, res) => {
    const { id, roleId } = req.user;

    if (!id) {
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {
                id: 'invalid user id',
            },
        });
    }

    // role lookup
    const role = await RoleRepository.findById(roleId).catch((err) => {
        // throw a exception
        console.error(err.message);
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {},
        });
    });

    if (role.name == 'Administrator') {
        // retrieve directory
        const data = await UserRepository.findAll(1, 500).catch((err) => {
            // throw a exception
            console.error(err.message);
            return res.status(500).send({
                message: DEFAULT_INTERNAL_ERROR_MESSAGE,
                path: {},
            });
        });

        if (data) {
            res.status(200).send({ ...data });
        }

        // directory empty
        return res.status(404).send({
            message: DEFAULT_NOT_FOUND_ERROR_MESSAGE,
            path: {
                id: 'user not found',
            },
        });
    }

    return res.status(500).send({
        message: DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
    });
};

export default UserDirectoryService;
