import { compareSync } from 'bcryptjs';
import { UserRepository } from '../../database/repository';
import {
    DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
    DEFAULT_INTERNAL_ERROR_MESSAGE,
    DEFAULT_NOT_FOUND_ERROR_MESSAGE,
    INCORRECT_CREDENTIALS_ERROR_MESSAGE,
    INCORRECT_PASSWORD_MESSAGE,
} from '../../util/constant';
import { SecurityUtil } from '../../util/security_util';
import { isArrayEmpty } from '../../util/validator_util';
import loginUserValidator from './validator/loginUserValidator';

const LoginUserService = async (req, res) => {
    const validator = await loginUserValidator(req.body);

    if (!validator.valid) {
        // throw a exception
        return res.status(400).send({
            message: DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
            path: validator.errors,
        });
    }
    // user lookup
    const { email, password } = req.body;
    const auth = await UserRepository.findOneBy('email', email).catch((err) => {
        // throw a exception
        console.error(err.message);
        return res.status(500).send({
            message: DEFAULT_INTERNAL_ERROR_MESSAGE,
            path: {},
        });
    });

    if (isArrayEmpty(auth)) {
        // throw a exception
        return res.status(404).send({
            message: INCORRECT_CREDENTIALS_ERROR_MESSAGE,
            path: { email: 'invalid username', password: 'invalid password' },
        });
    }

    // match password
    if (!compareSync(password, auth[0].password)) {
        return res.status(403).send({
            message: INCORRECT_PASSWORD_MESSAGE,
            path: { password: 'invalid password' },
        });
    }

    // grant user access
    return res.status(200).send({
        token: SecurityUtil.encrypt({ auth: auth[0] }),
    });
};

export default LoginUserService;
