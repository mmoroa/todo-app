import { TaskRepository } from '../../database/repository';
import TaskInputValidator from './validator/taskInputValidator';
import moment from 'moment';
import { DEFAULT_BAD_REQUEST_ERROR_MESSAGE, DEFAULT_INTERNAL_ERROR_MESSAGE } from '../../util/constant';

const UpdateTaskService = async (req, res) => {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;

    if (!userId || !taskId) {
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {
                id: 'invalid user id',
            },
        });
    }
    // validate inputs
    const validator = await TaskInputValidator({
        ...req.body,
        userId,
    });

    if (!validator.valid) {
        // throw a exception
        return res.status(400).send({
            message: DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
            path: validator.errors,
        });
    }

    // initiate task update
    const { title, description, isComplete } = req.body;
    TaskRepository.update(taskId, {
        title,
        description,
        userId: req.user.id,
        completedAt: isComplete && isComplete == true ? moment(new Date()).format('YYYY-MM-DD HH:mm:ss') : '',
    })
        .then((data) => {
            return res.status(201).send({
                message: 'updated successfully',
                data,
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

export default UpdateTaskService;
