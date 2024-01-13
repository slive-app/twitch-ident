import fetch from 'node-fetch';
import {
  APIEndpoint,
  GetChannelEditorsResponse,
  GetChannelInformationParams,
  GetUsersParams,
  GetUsersResponse,
} from 'twitch-api-types';

import { clean } from './utils';
import { AppOrUserAuthentication } from './types';

const throwError = (endpoint: keyof typeof APIEndpoint, json: unknown) => {
  throw new Error(
    `Error fetching ${endpoint} (${APIEndpoint[endpoint]})\n\n${JSON.stringify(
      json,
      null,
      2,
    )}`,
  );
};

const craftAuthHeaders = ({
  clientId,
  accessToken,
}: AppOrUserAuthentication) => ({
  'Client-ID': clientId,
  Authorization: `Bearer ${accessToken}`,
});

export const getChannelsAPI = async (
  { broadcaster_id }: GetChannelInformationParams,
  authentication: AppOrUserAuthentication,
) => {
  const qs = new URLSearchParams({
    broadcaster_id:
      typeof broadcaster_id === 'string'
        ? broadcaster_id
        : broadcaster_id.join('&'),
  });
  const response = await fetch(`${APIEndpoint.GetChannelInformation}?${qs}`, {
    method: 'GET',
    headers: craftAuthHeaders(authentication),
  });
  const json = (await response.json()) as GetChannelEditorsResponse;

  if (!response.ok) throwError('GetChannelInformation', json);

  return json.data;
};

export const getUsersAPI = async (
  { id, login }: GetUsersParams,
  authentication: AppOrUserAuthentication,
) => {
  const qs = new URLSearchParams(
    clean([
      !!id && ['id', typeof id === 'string' ? id : id.join('&')],
      !!login && ['login', typeof login === 'string' ? login : login.join('&')],
    ]),
  );
  const response = await fetch(`${APIEndpoint.GetUsers}?${qs}`, {
    method: 'GET',
    headers: craftAuthHeaders(authentication),
  });
  const json = (await response.json()) as GetUsersResponse;

  if (!response.ok) throwError('GetUsers', json);

  return json.data;
};
