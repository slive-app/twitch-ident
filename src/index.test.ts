import 'dotenv/config';
import fetch from 'node-fetch';
import {
  OAuthClientCredentialsResponse,
  OAuthEndpoints,
  OAuthGrantType,
} from 'twitch-api-types';

import { getUsers } from './user';
import { AppOrUserAuthentication } from './types';

let accessToken;

const getAppAccessToken = async () => {
  const qs = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID!,
    client_secret: process.env.TWITCH_CLIENT_SECRET!,
    grant_type: OAuthGrantType.ClientCredentials,
  });

  const response = await fetch(OAuthEndpoints.Token, {
    method: 'post',
    body: qs,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (response.ok) {
    const json: OAuthClientCredentialsResponse = await response.json();

    accessToken = json.access_token;

    return;
  }

  throw new Error('Failed to receive app access token');
};

const revokeAccessToken = async () => {
  const qs = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID!,
    token: accessToken,
  });

  await fetch(OAuthEndpoints.Revoke, {
    method: 'post',
    body: qs,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

describe('slive app twitch identity', () => {
  it('should not fail when a single user is requested with their login name', async () => {
    await getAppAccessToken();
    const auth: AppOrUserAuthentication = {
      clientId: process.env.TWITCH_CLIENT_ID!,
      accessToken,
    };

    const users = await getUsers(
      {
        login: 'lxrz',
      },
      auth,
    ).catch(() => null);

    expect(Array.isArray(users)).toBeTruthy();

    await revokeAccessToken();
  });

  it('should not fail if multiple users are requested with their login names', async () => {
    await getAppAccessToken();
    const auth: AppOrUserAuthentication = {
      clientId: process.env.TWITCH_CLIENT_ID!,
      accessToken,
    };

    const users = await getUsers(
      {
        login: ['lxrz', 'thejocraft_live'],
      },
      auth,
    ).catch(() => null);

    expect(Array.isArray(users)).toBeTruthy();

    await revokeAccessToken();
  });

  it('should not fail when a single user is requested with their user id', async () => {
    await getAppAccessToken();
    const auth: AppOrUserAuthentication = {
      clientId: process.env.TWITCH_CLIENT_ID!,
      accessToken,
    };

    const users = await getUsers(
      {
        id: '208363245',
      },
      auth,
    ).catch(() => null);

    expect(Array.isArray(users)).toBeTruthy();

    await revokeAccessToken();
  });

  it('should not fail if multiple users are requested with their user ids', async () => {
    await getAppAccessToken();
    const auth: AppOrUserAuthentication = {
      clientId: process.env.TWITCH_CLIENT_ID!,
      accessToken,
    };

    const users = await getUsers(
      {
        id: ['208363245', '31021656'],
      },
      auth,
    ).catch(() => null);

    expect(Array.isArray(users)).toBeTruthy();

    await revokeAccessToken();
  });
});
