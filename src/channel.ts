import { GetChannelInformationParams } from 'twitch-api-types';

import { getChannelsAPI } from './twitch';
import { AppOrUserAuthentication } from './types';

export const getChannels = async (
  params: GetChannelInformationParams,
  authentication: AppOrUserAuthentication,
) => {
  if (!authentication.accessToken || !authentication.clientId)
    throw new Error('Invalid Authentication Credentials');

  if (typeof params.broadcaster_id === 'string') {
    if (isNaN(+params.broadcaster_id))
      throw new Error('broadcast_id must be a number in the form of a string');
  } else if (params.broadcaster_id.filter((x) => isNaN(+x)).length)
    throw new Error('broadcast_id can only include numbers');

  return getChannelsAPI(params, authentication);
};
