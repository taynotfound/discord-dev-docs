# Discord Developer Portal — Documentation — Application

## Application Resource

## Application Object

## Application Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of the app |
| name | string | the name of the app |
| icon | ?string | the [icon hash](https://ptb.discord.com/developers/docs/reference#image-formatting) of the app |
| description | string | the description of the app |
| rpc\_origins? | array of strings | an array of rpc origin urls, if rpc is enabled |
| bot\_public | boolean | when false only app owner can join the app's bot to guilds |
| bot\_require\_code\_grant | boolean | when true the app's bot will only join upon completion of the full oauth2 code grant flow |
| terms\_of\_service\_url? | string | the url of the app's terms of service |
| privacy\_policy\_url? | string | the url of the app's privacy policy |
| owner? | partial [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object | partial user object containing info on the owner of the application |
| summary (deprecated) | string | deprecated and will be removed in v11. An empty string. |
| verify\_key | string | the hex encoded key for verification in interactions and the GameSDK's [GetTicket](https://ptb.discord.com/developers/docs/game-sdk/applications#getticket) |
| team | ?[team](https://ptb.discord.com/developers/docs/topics/teams#data-models-team-object) object | if the application belongs to a team, this will be a list of the members of that team |
| guild\_id? | snowflake | if this application is a game sold on Discord, this field will be the guild to which it has been linked |
| primary\_sku\_id? | snowflake | if this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists |
| slug? | string | if this application is a game sold on Discord, this field will be the URL slug that links to the store page |
| cover\_image? | string | the application's default rich presence invite [cover image hash](https://ptb.discord.com/developers/docs/reference#image-formatting) |
| flags? | integer | the application's public [flags](https://ptb.discord.com/developers/docs/resources/application#application-object-application-flags) |
| tags? | array of strings | up to 5 tags describing the content and functionality of the application |
| install\_params? | [install params](https://ptb.discord.com/developers/docs/resources/application#install-params-object) object | settings for the application's default in-app authorization link, if enabled |
| custom\_install\_url? | string | the application's default custom authorization link, if enabled |
| role\_connections\_verification\_url? | string | the application's role connection verification entry point, which when configured will render the app as a verification method in the guild role verification configuration |

## Example Application Object

```
{
  "bot_public": true,
  "bot_require_code_grant": false,
  "cover_image": "31deabb7e45b6c8ecfef77d2f99c81a5",
  "description": "Test",
  "guild_id": "290926798626357260",
  "icon": null,
  "id": "172150183260323840",
  "name": "Baba O-Riley",
  "owner": {
    "avatar": null,
    "discriminator": "1738",
    "flags": 1024,
    "id": "172150183260323840",
    "username": "i own a bot"
  },
  "primary_sku_id": "172150183260323840",
  "slug": "test",
  "summary": "",
  "team": {
    "icon": "dd9b7dcfdf5351b9c3de0fe167bacbe1",
    "id": "531992624043786253",
    "members": [
      {
        "membership_state": 2,
        "permissions": ["*"],
        "team_id": "531992624043786253",
        "user": {
          "avatar": "d9e261cd35999608eb7e3de1fae3688b",
          "discriminator": "0001",
          "id": "511972282709709995",
          "username": "Mr Owner"
        }
      }
    ]
  },
  "verify_key": "1e0a356058d627ca38a5c8c9648818061d49e49bd9da9e3ab17d98ad4d6bg2u8"
}
```

## Application Flags

| Value | Name | Description |
| --- | --- | --- |
| 1 << 6 | APPLICATION\_AUTO\_MODERATION\_RULE\_CREATE\_BADGE | Indicates if an app uses the [Auto Moderation API](https://ptb.discord.com/developers/docs/resources/auto-moderation) |
| 1 << 12 | GATEWAY\_PRESENCE | Intent required for bots in 100 or more servers to receive [```presence_update``` events](https://ptb.discord.com/developers/docs/topics/gateway-events#presence-update) |
| 1 << 13 | GATEWAY\_PRESENCE\_LIMITED | Intent required for bots in under 100 servers to receive [```presence_update``` events](https://ptb.discord.com/developers/docs/topics/gateway-events#presence-update), found on the Bot page in your app's settings |
| 1 << 14 | GATEWAY\_GUILD\_MEMBERS | Intent required for bots in 100 or more servers to receive member-related events like ```guild_member_add```. See the list of member-related events [under ```GUILD_MEMBERS```](https://ptb.discord.com/developers/docs/topics/gateway#list-of-intents) |
| 1 << 15 | GATEWAY\_GUILD\_MEMBERS\_LIMITED | Intent required for bots in under 100 servers to receive member-related events like ```guild_member_add```, found on the Bot page in your app's settings. See the list of member-related events [under ```GUILD_MEMBERS```](https://ptb.discord.com/developers/docs/topics/gateway#list-of-intents) |
| 1 << 16 | VERIFICATION\_PENDING\_GUILD\_LIMIT | Indicates unusual growth of an app that prevents verification |
| 1 << 17 | EMBEDDED | Indicates if an app is embedded within the Discord client (currently unavailable publicly) |
| 1 << 18 | GATEWAY\_MESSAGE\_CONTENT | Intent required for bots in 100 or more servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055) |
| 1 << 19 | GATEWAY\_MESSAGE\_CONTENT\_LIMITED | Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055), found on the Bot page in your app's settings |
| 1 << 23 | APPLICATION\_COMMAND\_BADGE | Indicates if an app has registered global [application commands](https://ptb.discord.com/developers/docs/interactions/application-commands) |

## Install Params Object

## Install Params Structure

| Field | Type | Description |
| --- | --- | --- |
| scopes | array of strings | the [scopes](https://ptb.discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes) to add the application to the server with |
| permissions | string | the [permissions](https://ptb.discord.com/developers/docs/topics/permissions) to request for the bot role |

