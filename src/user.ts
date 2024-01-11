import { GetUsersParams } from 'twitch-api-types';

import { getUsersAPI } from './twitch';
import { AppOrUserAuthentication } from './types';

export const getUsers = async (
  params: GetUsersParams,
  authentication: AppOrUserAuthentication,
) => {
  if (!authentication.accessToken || !authentication.clientId)
    throw new Error('Invalid Authentication Credentials');

  return getUsersAPI(params, authentication);
};
