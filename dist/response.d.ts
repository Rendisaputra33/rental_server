interface InputSuccess<R> {
    statusCode?: number;
    message?: string;
    data?: R;
}
export declare class ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    private constructor();
    static build<R>(data: InputSuccess<R>): ApiResponse<R>;
}
export {};
