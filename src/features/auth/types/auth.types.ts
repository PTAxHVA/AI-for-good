export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  name: string;
  password: string;
}

export interface LoggedUser {
  token: string;
  username: string;
  name: string;
}
