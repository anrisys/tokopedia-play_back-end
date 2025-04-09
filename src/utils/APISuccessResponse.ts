export class APISuccessResponse<T> {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode?: number,
    public readonly data?: T
  ) {}

  toJSON() {
    return {
      status: "success",
      code: this.code,
      message: this.message,
      statusCode: this.statusCode || 200,
      data: this.data,
    };
  }
}
