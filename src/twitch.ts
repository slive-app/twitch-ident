import fetch from 'node-fetch';
import {
  APIEndpoint,
  GetChannelEditorsResponse,
  GetChannelInformationParams,
  GetUsersParams,
  GetUsersResponse,
} from 'twitch-api-types';

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
  const boradcasterIdQs = broadcaster_id
    ? typeof broadcaster_id === 'string'
      ? `broadcaster_id=${broadcaster_id}`
      : broadcaster_id.reduce((p, c) => `${p}&broadcaster_id=${c}`, '').slice(1)
    : '';

  const response = await fetch(
    `${APIEndpoint.GetChannelInformation}?${boradcasterIdQs}`,
    {
      method: 'GET',
      headers: craftAuthHeaders(authentication),
    },
  );
  const json = (await response.json()) as GetChannelEditorsResponse;

  if (!response.ok) throwError('GetChannelInformation', json);

  return json.data;
};

export const getUsersAPI = async (
  { id, login }: GetUsersParams,
  authentication: AppOrUserAuthentication,
) => {
  const idQs = id
    ? typeof id === 'string'
      ? `user_id=${id}`
      : id.reduce((p, c) => `${p}&user_id=${c}`, '').slice(1)
    : '';

  const loginQs = login
    ? typeof login === 'string'
      ? `login=${login}`
      : login.reduce((p, c) => `${p}&login=${c}`, '').slice(1)
    : '';

  const response = await fetch(`${APIEndpoint.GetUsers}?${idQs}&${loginQs}`, {
    method: 'GET',
    headers: craftAuthHeaders(authentication),
  });
  const json = (await response.json()) as GetUsersResponse;

  if (!response.ok) throwError('GetUsers', json);

  return json.data;
};
