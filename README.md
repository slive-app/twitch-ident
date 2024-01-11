# Slive App - Twitch Identity

Twitch Identity Helper Functions

## Setup

```sh
npm install @sliveapp/twitch-ident
```

## Usage

```ts
import { getChannels } from '@sliveapp/twitch-ident';

const channels = await getChannels(
  {
    broadcaster_id: '141981764'
  },
  {
    accessToken: '...',
    clientId: '...',
  },
);
```
