// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Profile = {
    id: number;
    username: string;
    email: string;
    avatar: string;
    created_at: number;
    updated_at: number;
  };

  type LoginResult = {
    access_token: string;
    expires_in: number;
  };

  type LoginParams = {
    username: string;
    password: string;
  };

  type SendVerificationCodeParams = {
    email: string;
  };
}
