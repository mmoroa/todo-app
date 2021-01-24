import { UserRepository } from '../../database/repository';
import { DEFAULT_BAD_REQUEST_ERROR_MESSAGE, DEFAULT_INTERNAL_ERROR_MESSAGE } from '../../util/constant';
import { SecurityUtil } from '../../util/security_util';
import { isArrayEmpty } from '../../util/validator_util';
import loginUserValidator from './validator/loginUserValidator';

const RegisterUserService = async (req, res) => {
    const validator = await loginUserValidator(req.body);

    if (!validator.valid) {
        // throw a exception
        return res.status(400).send({
            message: DEFAULT_BAD_REQUEST_ERROR_MESSAGE,
            path: validator.errors,
        });
    }

    // user lookup
    const { email, password, username } = req.body;
    const auth = await UserRepository.findOneBy('email', email);
    const message = 'We are unable to process your request. A user, alias, or group already exists with that username';
    if (!isArrayEmpty(auth)) {
        // throw a exception
        return res.status(409).send({
            message,
            path: { email: 'Username already exists' },
        });
    }

    // register user
    UserRepository.create({
        roleId: 2,
        email,
        username,
        password: SecurityUtil.hash(password),
    })
        .then((data) => {
            return res.status(201).send({
                message: 'Registered Successfully',
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

export default RegisterUserService;
