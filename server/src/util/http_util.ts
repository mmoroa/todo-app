interface Error {
    code?: string,
    path?: object
    message: string
}

export const HttpException = {
    UNAUTHORIZED: () => ({ message: 'You are not authorized to perform this action. For assistance, please contact our customer service.', code: 'UNAUTHORIZED' }),
    BAD_REQUEST: ({ message, path }: Error) => ({ message, code: 'BAD_REQUEST', path }),
    FORBIDDEN: ({ message, path }: Error) => ({ message, code: 'FORBIDDEN', path }),
    NOT_FOUND: ({ message, path }: Error) => ({ message, code: 'NOT_FOUND', path }),
    NOT_ACCEPTABLE: ({ message, path }: Error) => ({ message, code: 'NOT_ACCEPTABLE', path }),
    INTERNAL_SERVER_ERROR: () => ({ message: 'We are unable to process your request at this time. Please try again in a few minutes.', code: 'INTERNAL_SERVER_ERROR' }),
    CONFLICT: ({ message, path }: Error) => ({ message, code: 'CONFLICT', path }),
    SERVICE_UNAVAILABLE: () => ({ message: 'We are unable to process your request at this time. For assistance, please contact our Customer Service.', code: 'SERVICE_UNAVAILABLE' }),
    tokenExpired: () => ({ message: 'We are unable to process your request at this time. Your session has expired. For assistance, please contact our Customer Service.', code: 'TOKEN_EXPIRED' }),

}