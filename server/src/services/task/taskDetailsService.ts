import { TaskRepository } from '../../database/repository';
import {
    DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
    DEFAULT_INTERNAL_ERROR_MESSAGE,
    DEFAULT_NOT_FOUND_ERROR_MESSAGE,
} from '../../util/constant';

const TaskDetailsService = async (req, res) => {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;

    if (!userId || !taskId) {
        return res.status(400).send({
            message: DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
            path: {
                id: 'invalid id',
            },
        });
    }

    // retrieve task
    TaskRepository.findById(taskId)
        .then((data) => {
            if (data) {
                return res.status(201).send({
                    ...data,
                    user: {
                        ...data['user'],
                        role: data['user']['role']['name'],
                    },
                });
            }

            return res.status(404).send({
                message: DEFAULT_NOT_FOUND_ERROR_MESSAGE,
                path: {
                    id: 'task not found',
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

export default TaskDetailsService;
