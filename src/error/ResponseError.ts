export class ResponseError extends Error {
  constructor(
    public readonly type: string, // High-level error category (e.g., "BusinessLogic")
    public readonly message: string,
    public readonly statusCode: number,
    public readonly code?: string,
    public readonly details?: Record<string, unknown> | unknown[]
  ) {
    super(message);
    this.name = this.constructor.name; // Automatically sets the error name
    Object.setPrototypeOf(this, ResponseError.prototype);
  }

  toJSON() {
    return {
      error: {
        type: this.type,
        message: this.message,
        code: this.code || this.type,
        statusCode: this.statusCode,
        ...(this.details && { details: this.details }),
      },
    };
  }
}
