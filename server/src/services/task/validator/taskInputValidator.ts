import Joi from 'joi';
import { ValidateUserInput } from '../../../util/validator_util';

/*
|--------------------------------------------------------------------------
| TASK INPUT VALIDATION
|--------------------------------------------------------------------------
| validate submitted inputs
|
*/
const TaskInputValidator = async (input: TaskInput) => {
    // validation rules
    const rules = {
        id: Joi.number().optional().allow(null, ''),
        title: Joi.string().required(),
        description: Joi.string().required(),
        isComplete: Joi.boolean().optional().allow(null, ''),
        userId: Joi.number().required(),
    };

    return ValidateUserInput(input, rules);
};

export default TaskInputValidator;
