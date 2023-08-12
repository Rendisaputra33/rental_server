interface InputSuccess<R> {
  statusCode?: number;
  message?: string;
  data?: R;
}

export class ApiResponse<T> {
  public statusCode: number;
  public message: string;
  public data: T;

  private constructor({ statusCode, message, data }: InputSuccess<T>) {
    this.statusCode = statusCode ?? 200;
    this.message = message ?? 'Success';
    this.data = data ?? undefined;
  }

  static build<R>(data: InputSuccess<R>) {
    return new ApiResponse<R>(data);
  }
}
