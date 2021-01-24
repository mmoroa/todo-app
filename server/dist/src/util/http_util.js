"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
exports.HttpException = {
    UNAUTHORIZED: function () { return ({ message: 'You are not authorized to perform this action. For assistance, please contact our customer service.', code: 'UNAUTHORIZED' }); },
    BAD_REQUEST: function (_a) {
        var message = _a.message, path = _a.path;
        return ({ message: message, code: 'BAD_REQUEST', path: path });
    },
    FORBIDDEN: function (_a) {
        var message = _a.message, path = _a.path;
        return ({ message: message, code: 'FORBIDDEN', path: path });
    },
    NOT_FOUND: function (_a) {
        var message = _a.message, path = _a.path;
        return ({ message: message, code: 'NOT_FOUND', path: path });
    },
    NOT_ACCEPTABLE: function (_a) {
        var message = _a.message, path = _a.path;
        return ({ message: message, code: 'NOT_ACCEPTABLE', path: path });
    },
    INTERNAL_SERVER_ERROR: function () { return ({ message: 'We are unable to process your request at this time. Please try again in a few minutes.', code: 'INTERNAL_SERVER_ERROR' }); },
    CONFLICT: function (_a) {
        var message = _a.message, path = _a.path;
        return ({ message: message, code: 'CONFLICT', path: path });
    },
    SERVICE_UNAVAILABLE: function () { return ({ message: 'We are unable to process your request at this time. For assistance, please contact our Customer Service.', code: 'SERVICE_UNAVAILABLE' }); },
    tokenExpired: function () { return ({ message: 'We are unable to process your request at this time. Your session has expired. For assistance, please contact our Customer Service.', code: 'TOKEN_EXPIRED' }); },
};
//# sourceMappingURL=http_util.js.map