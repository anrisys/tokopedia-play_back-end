export type RegisterRequestData = {
  email: string;
  password: string;
  public_id: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  userId: string;
  token: string;
};
