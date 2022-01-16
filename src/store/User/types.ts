export interface UserState {
  profile: {
    name: string;
    image: string;
    uri: string;
    url: string;
  };
  auth: {
    access_token: string;
    expires_in: string;
    refresh_token: string;
  };
}
