# Discord Developer Portal — Documentation — User

## Users Resource

Users in Discord are generally considered the base entity. Users can spawn across the entire platform, be members of guilds, participate in text and voice chat, and much more. Users are separated by a distinction of "bot" vs "normal." Although they are similar, bot users are automated users that are "owned" by another user. Unlike normal users, bot users do not have a limitation on the number of Guilds they can be a part of.

## Usernames and Nicknames

Discord enforces the following restrictions for usernames and nicknames:

1.  Names can contain most valid unicode characters. We limit some zero-width and non-rendering characters.
2.  Usernames must be between 2 and 32 characters long.
3.  Nicknames must be between 1 and 32 characters long.
4.  Names are sanitized and trimmed of leading, trailing, and excessive internal whitespace.

The following restrictions are additionally enforced for usernames:

1.  Usernames cannot contain the following substrings: ```@```, ```#```, ```:```, `````````, ```discord```
2.  Usernames cannot be: ```everyone```, ```here```

There are other rules and restrictions not shared here for the sake of spam and abuse mitigation, but the majority of users won't encounter them. It's important to properly handle all error messages returned by Discord when editing or updating names.

## User Object

## User Structure

| Field | Type | Description | Required OAuth2 Scope |
| --- | --- | --- | --- |
| id | snowflake | the user's id | identify |
| username | string | the user's username, not unique across the platform | identify |
| discriminator | string | the user's 4-digit discord-tag | identify |
| avatar | ?string | the user's [avatar hash](https://ptb.discord.com/developers/docs/reference#image-formatting) | identify |
| bot? | boolean | whether the user belongs to an OAuth2 application | identify |
| system? | boolean | whether the user is an Official Discord System user (part of the urgent message system) | identify |
| mfa\_enabled? | boolean | whether the user has two factor enabled on their account | identify |
| banner? | ?string | the user's [banner hash](https://ptb.discord.com/developers/docs/reference#image-formatting) | identify |
| accent\_color? | ?integer | the user's banner color encoded as an integer representation of hexadecimal color code | identify |
| locale? | string | the user's chosen [language option](https://ptb.discord.com/developers/docs/reference#locales) | identify |
| verified? | boolean | whether the email on this account has been verified | email |
| email? | ?string | the user's email | email |
| flags? | integer | the [flags](https://ptb.discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account | identify |
| premium\_type? | integer | the [type of Nitro subscription](https://ptb.discord.com/developers/docs/resources/user#user-object-premium-types) on a user's account | identify |
| public\_flags? | integer | the public [flags](https://ptb.discord.com/developers/docs/resources/user#user-object-user-flags) on a user's account | identify |

## Example User

```
{
  "id": "80351110224678912",
  "username": "Nelly",
  "discriminator": "1337",
  "avatar": "8342729096ea3675442027381ff50dfe",
  "verified": true,
  "email": "nelly@discord.com",
  "flags": 64,
  "banner": "06c16474723fe537c283b8efa61a30c8",
  "accent_color": 16711680,
  "premium_type": 1,
  "public_flags": 64
}
```

## User Flags

| Value | Name | Description |
| --- | --- | --- |
| 1 << 0 | STAFF | Discord Employee |
| 1 << 1 | PARTNER | Partnered Server Owner |
| 1 << 2 | HYPESQUAD | HypeSquad Events Member |
| 1 << 3 | BUG\_HUNTER\_LEVEL\_1 | Bug Hunter Level 1 |
| 1 << 6 | HYPESQUAD\_ONLINE\_HOUSE\_1 | House Bravery Member |
| 1 << 7 | HYPESQUAD\_ONLINE\_HOUSE\_2 | House Brilliance Member |
| 1 << 8 | HYPESQUAD\_ONLINE\_HOUSE\_3 | House Balance Member |
| 1 << 9 | PREMIUM\_EARLY\_SUPPORTER | Early Nitro Supporter |
| 1 << 10 | TEAM\_PSEUDO\_USER | User is a [team](https://ptb.discord.com/developers/docs/topics/teams) |
| 1 << 14 | BUG\_HUNTER\_LEVEL\_2 | Bug Hunter Level 2 |
| 1 << 16 | VERIFIED\_BOT | Verified Bot |
| 1 << 17 | VERIFIED\_DEVELOPER | Early Verified Bot Developer |
| 1 << 18 | CERTIFIED\_MODERATOR | Moderator Programs Alumni |
| 1 << 19 | BOT\_HTTP\_INTERACTIONS | Bot uses only [HTTP interactions](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) and is shown in the online member list |
| 1 << 22 | ACTIVE\_DEVELOPER | User is an [Active Developer](https://support-dev.discord.com/hc/articles/10113997751447) |

## Premium Types

Premium types denote the level of premium a user has. Visit the [Nitro](https://discord.com/nitro) page to learn more about the premium plans we currently offer.

| Value | Name |
| --- | --- |
| 0 | None |
| 1 | Nitro Classic |
| 2 | Nitro |
| 3 | Nitro Basic |

## Connection Object

The connection object that the user has attached.

## Connection Structure

| Field | Type | Description |
| --- | --- | --- |
| id | string | id of the connection account |
| name | string | the username of the connection account |
| type | string | the [service](https://ptb.discord.com/developers/docs/resources/user#connection-object-services) of this connection |
| revoked? | boolean | whether the connection is revoked |
| integrations? | array | an array of partial [server integrations](https://ptb.discord.com/developers/docs/resources/guild#integration-object) |
| verified | boolean | whether the connection is verified |
| friend\_sync | boolean | whether friend sync is enabled for this connection |
| show\_activity | boolean | whether activities related to this connection will be shown in presence updates |
| two\_way\_link | boolean | whether this connection has a corresponding third party OAuth2 token |
| visibility | integer | [visibility](https://ptb.discord.com/developers/docs/resources/user#connection-object-visibility-types) of this connection |

## Services

| Value | Name |
| --- | --- |
| battlenet | Battle.net |
| ebay | eBay |
| epicgames | Epic Games |
| facebook | Facebook |
| github | GitHub |
| instagram | Instagram |
| leagueoflegends | League of Legends |
| paypal | PayPal |
| playstation | PlayStation Network |
| reddit | Reddit |
| riotgames | Riot Games |
| spotify | Spotify |
| skype \* | Skype |
| steam | Steam |
| tiktok | TikTok |
| twitch | Twitch |
| twitter | Twitter |
| xbox | Xbox |
| youtube | YouTube |

\* Service can no longer be added by users

## Visibility Types

| Value | Name | Description |
| --- | --- | --- |
| 0 | None | invisible to everyone except the user themselves |
| 1 | Everyone | visible to everyone |

## Application Role Connection Object

The role connection object that an application has attached to a user.

## Application Role Connection Structure

| Field | Type | Description |
| --- | --- | --- |
| platform\_name | ?string | the vanity name of the platform a bot has connected (max 50 characters) |
| platform\_username | ?string | the username on the platform a bot has connected (max 100 characters) |
| metadata | object | object mapping [application role connection metadata](https://ptb.discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object) keys to their ```string```\-ified value (max 100 characters) for the user on the platform a bot has connected |

Get Current User[

](#get-current-user)
---------------------------------------

GET/users/@me

Returns the [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object of the requester's account. For OAuth2, this requires the ```identify``` scope, which will return the object without an email, and optionally the ```email``` scope, which returns the object with an email.

Get User[

](#get-user)
-----------------------

GET/users/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

Returns a [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object for a given user ID.

Modify Current User[

](#modify-current-user)
---------------------------------------------

PATCH/users/@me

Modify the requester's user account settings. Returns a [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object on success. Fires a [User Update](https://ptb.discord.com/developers/docs/topics/gateway-events#user-update) Gateway event.

All parameters to this endpoint are optional.

## Get Current User

GET

/users/@me

## Get User

GET

/users/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

## Modify Current User

PATCH

/users/@me

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| username | string | user's username, if changed may cause the user's discriminator to be randomized. |
| avatar | ?[image data](https://ptb.discord.com/developers/docs/reference#image-data) | if passed, modifies the user's avatar |

Get Current User Guilds[

](#get-current-user-guilds)
-----------------------------------------------------

GET/users/@me/guilds

Returns a list of partial [guild](https://ptb.discord.com/developers/docs/resources/guild#guild-object) objects the current user is a member of. Requires the ```guilds``` OAuth2 scope.

## Get Current User Guilds

GET

/users/@me/guilds

## Example Partial Guild

```
{
  "id": "80351110224678912",
  "name": "1337 Krew",
  "icon": "8342729096ea3675442027381ff50dfe",
  "owner": true,
  "permissions": "36953089",
  "features": ["COMMUNITY", "NEWS"]
}
```

This endpoint returns 200 guilds by default, which is the maximum number of guilds a non-bot user can join. Therefore, pagination is not needed for integrations that need to get a list of the users' guilds.

## Query String Params

| Field | Type | Description | Required | Default |
| --- | --- | --- | --- | --- |
| before | snowflake | get guilds before this guild ID | false | absent |
| after | snowflake | get guilds after this guild ID | false | absent |
| limit | integer | max number of guilds to return (1-200) | false | 200 |

Get Current User Guild Member[

](#get-current-user-guild-member)
-----------------------------------------------------------------

GET/users/@me/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/member

Returns a [guild member](https://ptb.discord.com/developers/docs/resources/guild#guild-member-object) object for the current user. Requires the ```guilds.members.read``` OAuth2 scope.

Leave Guild[

](#leave-guild)
-----------------------------

DELETE/users/@me/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)

Leave a guild. Returns a 204 empty response on success. Fires a [Guild Delete](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-delete) Gateway event and a [Guild Member Remove](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-member-remove) Gateway event.

Create DM[

](#create-dm)
-------------------------

POST/users/@me/channels

Create a new DM channel with a user. Returns a [DM channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) object (if one already exists, it will be returned instead).

You should not use this endpoint to DM everyone in a server about something. DMs should generally be initiated by a user action. If you open a significant amount of DMs too quickly, your bot may be rate limited or blocked from opening new ones.

## Get Current User Guild Member

GET

/users/@me/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/member

## Leave Guild

DELETE

/users/@me/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)

## Create DM

POST

/users/@me/channels

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| recipient\_id | snowflake | the recipient to open a DM channel with |

Create Group DM[

](#create-group-dm)
-------------------------------------

POST/users/@me/channels

Create a new group DM channel with multiple users. Returns a [DM channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) object. This endpoint was intended to be used with the now-deprecated GameBridge SDK. Fires a [Channel Create](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-create) Gateway event.

This endpoint is limited to 10 active group DMs.

## Create Group DM

POST

/users/@me/channels

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| access\_tokens | array of strings | access tokens of users that have granted your app the ```gdm.join``` scope |
| nicks | dict | a dictionary of user ids to their respective nicknames |

Get User Connections[

](#get-user-connections)
-----------------------------------------------

GET/users/@me/connections

Returns a list of [connection](https://ptb.discord.com/developers/docs/resources/user#connection-object) objects. Requires the ```connections``` OAuth2 scope.

Get User Application Role Connection[

](#get-user-application-role-connection)
-------------------------------------------------------------------------------

GET/users/@me/applications/[{application.id}](https://ptb.discord.com/developers/docs/resources/application#application-object)/role-connection

Returns the [application role connection](https://ptb.discord.com/developers/docs/resources/user#application-role-connection-object) for the user. Requires an OAuth2 access token with ```role_connections.write``` scope for the application specified in the path.

Update User Application Role Connection[

](#update-user-application-role-connection)
-------------------------------------------------------------------------------------

PUT/users/@me/applications/[{application.id}](https://ptb.discord.com/developers/docs/resources/application#application-object)/role-connection

Updates and returns the [application role connection](https://ptb.discord.com/developers/docs/resources/user#application-role-connection-object) for the user. Requires an OAuth2 access token with ```role_connections.write``` scope for the application specified in the path.

## Get User Connections

GET

/users/@me/connections

## Get User Application Role Connection

GET

/users/@me/applications/[{application.id}](https://ptb.discord.com/developers/docs/resources/application#application-object)/role-connection

## Update User Application Role Connection

PUT

/users/@me/applications/[{application.id}](https://ptb.discord.com/developers/docs/resources/application#application-object)/role-connection

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| platform\_name? | string | the vanity name of the platform a bot has connected (max 50 characters) |
| platform\_username? | string | the username on the platform a bot has connected (max 100 characters) |
| metadata? | object | object mapping [application role connection metadata](https://ptb.discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object) keys to their ```string```\-ified value (max 100 characters) for the user on the platform a bot has connected |

