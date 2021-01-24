import Joi from 'joi';
import { ValidateUserInput } from '../../../util/validator_util';

/*
|--------------------------------------------------------------------------
| LOGIN INPUT VALIDATION
|--------------------------------------------------------------------------
| validate submitted inputs
|
*/
const loginUserValidator = async (input: LoginUserInput) => {
    // validation rules
    const rules = {
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim(),
        username: Joi.string().optional().trim(),
    };
    return ValidateUserInput(input, rules);
};

export default loginUserValidator;
