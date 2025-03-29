import { ResponseError } from "./ResponseError";

export class BusinessLogicError extends ResponseError {
  constructor(message: string, code = "business_error", statusCode = 400) {
    super("business", message, statusCode, code);
  }
}

export class AuthenticationError extends ResponseError {
  constructor(message = "Authentication failed", code = "invalid_credentials") {
    super("authentication", message, 401, code);
  }
}

export class AuthorizationError extends ResponseError {
  constructor(message = "Forbidden", code = "missing_permissions") {
    super("authorization", message, 403, code);
  }
}

export class NotFoundError extends ResponseError {
  constructor(message = "Resource not found", code = "not_found") {
    super("not_found", message, 404, code);
  }
}

export class RateLimitError extends ResponseError {
  constructor(message = "Too many requests", code = "rate_limit_exceeded") {
    super("rate_limit", message, 429, code);
  }
}

export class ValidationError extends ResponseError {
  constructor(
    message: string = "Validation failed",
    details?: Record<string, string[]> | string[],
    code: string = "validation_error"
  ) {
    super("validation", message, 400, code, details);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class PaymentError extends ResponseError {
  constructor(message: string, details?: { invoiceId: string }) {
    super("payment", message, 402, "payment_required", details);
  }
}
