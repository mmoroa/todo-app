import { genSaltSync, hashSync } from 'bcryptjs';
import { sign, verify, decode } from 'jsonwebtoken';
import { DEFAULT_UNAUTHORIZED_ERROR_MESSAGE } from './constant';

export const SecurityUtil = {
    /*
    |--------------------------------------------------------------------------
    | Generate Access Token
    |--------------------------------------------------------------------------
    | create a session token across the entire site with given a timespan
    |
    */
    encrypt: (data: object, expiresIn: string = '24h') => {
        return sign(Object.assign({}, data), 'sercet', {
            expiresIn,
        });
    },
    /*
    |--------------------------------------------------------------------------
    | Verify access token
    |--------------------------------------------------------------------------
    | Verify whether a session token is valid within given a timespan
    |
    */
    verifyAccessToken: (req, res, next) => {
        // verify user access token
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            verify(token, 'sercet', (err, user) => {
                if (err) {
                    console.error('VERIFY ACCESS TOKEN ERROR:' + err);
                    return res.sendStatus(403);
                }

                req.user = user.auth;
                next();
            });
        } else {
            res.status(401).send({
                message: DEFAULT_UNAUTHORIZED_ERROR_MESSAGE,
            });
        }
    },
    /*
    |--------------------------------------------------------------------------
    | decode access token
    |--------------------------------------------------------------------------
    | decode encryption
    |
    */
    decodeAccessToken: (token: string) => {
        return decode(token, { complete: true, json: true });
    },

    hash: (str: string | number) => hashSync(str.toString(), genSaltSync(10)),
};
