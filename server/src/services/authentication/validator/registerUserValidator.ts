import Joi from 'joi';
import { ValidateUserInput } from '../../../util/validator_util';
import RegisterUserInput  from "../model/registerUserInput";
  /*
|--------------------------------------------------------------------------
| REGISTER INPUT VALIDATION
|--------------------------------------------------------------------------
| validate submitted inputs
|
*/
const registerUserValidator = ( input: RegisterUserInput) => {
    // validation rules
    const rules = {
        email: Joi.string().required().email().trim(),
        password: Joi.string().required().trim(),
        username: Joi.string().required().trim(),
      };

      return ValidateUserInput(input, rules);
}

export default registerUserValidator;