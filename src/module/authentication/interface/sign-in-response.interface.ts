export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
