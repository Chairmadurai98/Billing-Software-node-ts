
type SuccessResponseType<Response = unknown> = {
    data?: unknown,
    message?: string,
    status?: 200 | 201,
    res : Response
}

type ErrorResponseType<Response = unknown> = {
    error: Error | any,
    message?: string,
    status?: 400 | 404 | 500,
    res : Response
}

type CustomResponseType<Response = unknown> = {
    success : ( props : SuccessResponseType<Response> )=> void,
    error : ( props : ErrorResponseType<Response> )=> void,
}