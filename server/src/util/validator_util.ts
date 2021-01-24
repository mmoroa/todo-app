
import joi from "joi"

export const isEmpty = (obj: object) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const isArrayEmpty = (array: any) => {
    return !(Array.isArray(array) && array.length);

}

export const ValidateUserInput = (input: object, rules: object) => {
    const schema = joi.object(rules);
    const { error } = schema.validate(input, { abortEarly: false });
    const errors: any = {};
    error?.details.forEach((item: any) => {
        errors[item.path[0]] = item.message;
    });

    return {
        valid: isEmpty(errors),
        errors
    }
}
