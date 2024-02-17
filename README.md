# Slive App - Twitch Identity

Twitch Identity Helper Functions

## Setup

```sh
npm install @sliveapp/twitch-ident
```

## Usage

### Access providing `accessToken` and `clientId`

```ts
import { getChannels } from '@sliveapp/twitch-ident';

const channels = await getChannels(
  {
    broadcaster_id: '141981764',
  },
  {
    accessToken: '...',
    clientId: '...',
  },
);
```

### Class-based approach

```ts
import TwitchIdent from '@sliveapp/twitch-ident';

const twitchIdent = new TwitchIdent({
  clientId: '...',
  getAccessToken: async () => {
    // ...
    return '...',
  },
});

const channels = await twitchIdent.getChannels({
  id: ['...', '...'],
});
```
