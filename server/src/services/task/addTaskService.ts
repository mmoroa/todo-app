import { TaskRepository } from '../../database/repository';
import TaskInputValidator from './validator/taskInputValidator';
import moment from 'moment';
import { DEFAULT_BAD_REQUEST_ERROR_MESSAGE, DEFAULT_INTERNAL_ERROR_MESSAGE } from '../../util/constant';

const AddTaskService = async (req, res) => {
    const { id: userId } = req.user;

    console.log(req.user);
    if (!userId) {
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {
                id: 'invalid user id',
            },
        });
    }

    // validate user input
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

    const { title, description, isComplete } = req.body;

    // initiate task create
    TaskRepository.create({
        title,
        description,
        userId,
        completedAt: isComplete && isComplete == true ? moment(new Date()).format('YYYY-MM-DD HH:mm:ss') : '',
    })
        .then((data) => {
            return res.status(201).send({
                message: 'created successfully',
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

export default AddTaskService;
