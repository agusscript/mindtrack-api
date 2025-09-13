export interface ISignInResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
