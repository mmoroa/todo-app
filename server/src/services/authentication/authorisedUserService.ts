import { UserRepository } from '../../database/repository';
import { DEFAULT_INTERNAL_ERROR_MESSAGE, DEFAULT_NOT_FOUND_ERROR_MESSAGE } from '../../util/constant';

const AuthorisedUserProfileService = async (req, res) => {
    const { id } = req.user;

    if (!id) {
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {
                id: 'invalid user id',
            },
        });
    }

    // lookup user
    UserRepository.findById(id)
        .then((data) => {
            // user found
            if (data) {
                return res.status(201).send({
                    id: data.id,
                    role: data['role'].name,
                    email: data.email,
                    username: data.username,
                    createdAt: data.createdAt,
                });
            }

            // user not found
            return res.status(404).send({
                message: DEFAULT_NOT_FOUND_ERROR_MESSAGE,
                path: {
                    id: 'user not found',
                },
            });
        })
        .catch((err) => {
            // throw a exception
            console.error(err.message);
            return res.status(500).send({
                message: DEFAULT_INTERNAL_ERROR_MESSAGE,
                path: {},
            });
        });
};

export default AuthorisedUserProfileService;
