import { getUsers } from './user';
import { getChannels } from './channel';
import { TwitchIdentOptions } from './types';

class TwitchIdent {
  clientId: string;
  getAccessToken: () => Promise<string>;

  constructor(options: TwitchIdentOptions) {
    this.clientId = options.clientId;
    this.getAccessToken = options.getAccessToken;
  }

  async getUsers(params: Parameters<typeof getUsers>[0]) {
    const accessToken = await this.getAccessToken();
    if (!accessToken)
      throw new Error('Unable to fetch access token using getAccessToken');

    return await getUsers(params, {
      clientId: this.clientId,
      accessToken,
    });
  }

  async getChannels(params: Parameters<typeof getChannels>[0]) {
    const accessToken = await this.getAccessToken();
    if (!accessToken)
      throw new Error('Unable to fetch access token using getAccessToken');

    return await getChannels(params, {
      clientId: this.clientId,
      accessToken,
    });
  }
}

export default TwitchIdent;
