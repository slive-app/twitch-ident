export interface AppOrUserAuthentication {
  /**
   * App Client ID
   */
  clientId: string;
  /**
   * App or User access token
   */
  accessToken: string;
}

export interface TwitchIdentOptions {
  clientId: string;
  getAccessToken: () => Promise<string>;
}
