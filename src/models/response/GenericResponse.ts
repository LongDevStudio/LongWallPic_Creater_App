interface GenericResponse<T> {
    success: boolean;
    code: StatusCode;
    message: string;
    data?: T;
}

enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    // auth
    INVALID_EMAIL = 4001
}

const StatusMessages: { [key in StatusCode]: string } = {
    [StatusCode.OK]: "Success",
    [StatusCode.CREATED]: "Resource created",
    [StatusCode.BAD_REQUEST]: "Bad request",
    [StatusCode.UNAUTHORIZED]: "Unauthorized",
    [StatusCode.FORBIDDEN]: "Forbidden",
    [StatusCode.NOT_FOUND]: "Not found",
    [StatusCode.INTERNAL_SERVER_ERROR]: "Internal server error",
    [StatusCode.INVALID_EMAIL]: "Invalid email address" // 自定义消息
};

export type { GenericResponse };
