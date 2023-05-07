# Discord Developer Portal — Documentation — Emoji

## Emoji Resource

Routes for controlling emojis do not follow the normal rate limit conventions. These routes are specifically limited on a per-guild basis to prevent abuse. This means that the quota returned by our APIs may be inaccurate, and you may encounter 429s.

## Emoji Object

## Emoji Structure

| Field | Type | Description |
| --- | --- | --- |
| id | ?snowflake | [emoji id](https://ptb.discord.com/developers/docs/reference#image-formatting) |
| name | ?string (can be null only in reaction emoji objects) | emoji name |
| roles? | array of [role](https://ptb.discord.com/developers/docs/topics/permissions#role-object) object ids | roles allowed to use this emoji |
| user? | [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object | user that created this emoji |
| require\_colons? | boolean | whether this emoji must be wrapped in colons |
| managed? | boolean | whether this emoji is managed |
| animated? | boolean | whether this emoji is animated |
| available? | boolean | whether this emoji can be used, may be false due to loss of Server Boosts |

## Premium Emoji

Roles with the ```integration_id``` tag being the guild's guild\_subscription integration are considered subscription roles.  
An emoji cannot have both subscription roles and non-subscription roles.  
Emojis with subscription roles are considered premium emoji, and count toward a separate limit of 25.  
Emojis cannot be converted between normal and premium after creation.

## Emoji Example

```
{
  "id": "41771983429993937",
  "name": "LUL",
  "roles": ["41771983429993000", "41771983429993111"],
  "user": {
    "username": "Luigi",
    "discriminator": "0002",
    "id": "96008815106887111",
    "avatar": "5500909a3274e1812beb4e8de6631111",
    "public_flags": 131328
  },
  "require_colons": true,
  "managed": false,
  "animated": false
}
```

## Standard Emoji Example

```
{
  "id": null,
  "name": "🔥"
}
```

## Custom Emoji Examples

In ```MESSAGE_REACTION_ADD``` gateway events ```animated``` will be returned for animated emoji.

In ```MESSAGE_REACTION_ADD``` and ```MESSAGE_REACTION_REMOVE``` gateway events ```name``` may be ```null``` when custom emoji data is not available (for example, if it was deleted from the guild).

```
{
  "id": "41771983429993937",
  "name": "LUL",
  "animated": true
}
```

```
{
  "id": "41771983429993937",
  "name": null
}
```

List Guild Emojis[

](#list-guild-emojis)
-----------------------------------------

GET/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis

Returns a list of [emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) objects for the given guild.

Get Guild Emoji[

](#get-guild-emoji)
-------------------------------------

GET/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis/[{emoji.id}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

Returns an [emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) object for the given guild and emoji IDs.

Create Guild Emoji[

](#create-guild-emoji)
-------------------------------------------

POST/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis

Create a new emoji for the guild. Requires the ```MANAGE_GUILD_EXPRESSIONS``` permission. Returns the new [emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) object on success. Fires a [Guild Emojis Update](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-emojis-update) Gateway event.

Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a [JSON status code](https://ptb.discord.com/developers/docs/topics/opcodes-and-status-codes#json).

This endpoint supports the ```X-Audit-Log-Reason``` header.

## List Guild Emojis

GET

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis

## Get Guild Emoji

GET

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis/[{emoji.id}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

## Create Guild Emoji

POST

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the emoji |
| image | [image data](https://ptb.discord.com/developers/docs/reference#image-data) | the 128x128 emoji image |
| roles | array of snowflakes | roles allowed to use this emoji |

Modify Guild Emoji[

](#modify-guild-emoji)
-------------------------------------------

PATCH/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis/[{emoji.id}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

Modify the given emoji. Requires the ```MANAGE_GUILD_EXPRESSIONS``` permission. Returns the updated [emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) object on success. Fires a [Guild Emojis Update](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-emojis-update) Gateway event.

All parameters to this endpoint are optional.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Modify Guild Emoji

PATCH

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis/[{emoji.id}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the emoji |
| roles | ?array of snowflakes | roles allowed to use this emoji |

Delete Guild Emoji[

](#delete-guild-emoji)
-------------------------------------------

DELETE/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis/[{emoji.id}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

Delete the given emoji. Requires the ```MANAGE_GUILD_EXPRESSIONS``` permission. Returns ```204 No Content``` on success. Fires a [Guild Emojis Update](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-emojis-update) Gateway event.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Delete Guild Emoji

DELETE

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/emojis/[{emoji.id}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

