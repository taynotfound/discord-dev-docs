# Discord Developer Portal — Documentation — Guild Template

## Guild Template Resource

## Guild Template Object

Represents a code that when used, creates a guild based on a snapshot of an existing guild.

## Guild Template Structure

| Field | Type | Description |
| --- | --- | --- |
| code | string | the template code (unique ID) |
| name | string | template name |
| description | ?string | the description for the template |
| usage\_count | integer | number of times this template has been used |
| creator\_id | snowflake | the ID of the user who created the template |
| creator | [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object | the user who created the template |
| created\_at | ISO8601 timestamp | when this template was created |
| updated\_at | ISO8601 timestamp | when this template was last synced to the source guild |
| source\_guild\_id | snowflake | the ID of the guild this template is based on |
| serialized\_source\_guild | partial [guild](https://ptb.discord.com/developers/docs/resources/guild#guild-object) object | the guild snapshot this template contains |
| is\_dirty | ?boolean | whether the template has unsynced changes |

## Example Guild Template Object

```
{
  "code": "hgM48av5Q69A",
  "name": "Friends & Family",
  "description": "",
  "usage_count": 49605,
  "creator_id": "132837293881950208",
  "creator": {
    "id": "132837293881950208",
    "username": "hoges",
    "avatar": "79b0d9f8c340f2d43e1f78b09f175b62",
    "discriminator": "0001",
    "public_flags": 129
  },
  "created_at": "2020-04-02T21:10:38+00:00",
  "updated_at": "2020-05-01T17:57:38+00:00",
  "source_guild_id": "678070694164299796",
  "serialized_source_guild": {
    "name": "Friends & Family",
    "description": null,
    "region": "us-west",
    "verification_level": 0,
    "default_message_notifications": 0,
    "explicit_content_filter": 0,
    "preferred_locale": "en-US",
    "afk_timeout": 300,
    "roles": [
      {
        "id": 0,
        "name": "@everyone",
        "permissions": 104324689,
        "color": 0,
        "hoist": false,
        "mentionable": false
      }
    ],
    "channels": [
      {
        "name": "Text Channels",
        "position": 1,
        "topic": null,
        "bitrate": 64000,
        "user_limit": 0,
        "nsfw": false,
        "rate_limit_per_user": 0,
        "parent_id": null,
        "permission_overwrites": [],
        "id": 1,
        "type": 4
      },
      {
        "name": "general",
        "position": 1,
        "topic": null,
        "bitrate": 64000,
        "user_limit": 0,
        "nsfw": false,
        "rate_limit_per_user": 0,
        "parent_id": 1,
        "permission_overwrites": [],
        "id": 2,
        "type": 0
      }
    ],
    "afk_channel_id": null,
    "system_channel_id": 2,
    "system_channel_flags": 0,
    "icon_hash": null
  },
  "is_dirty": null
}
```

Get Guild Template[

](#get-guild-template)
-------------------------------------------

GET/guilds/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

Returns a [guild template](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object) object for the given code.

Create Guild from Guild Template[

](#create-guild-from-guild-template)
-----------------------------------------------------------------------

POST/guilds/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

Create a new guild based on a template. Returns a [guild](https://ptb.discord.com/developers/docs/resources/guild#guild-object) object on success. Fires a [Guild Create](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-create) Gateway event.

This endpoint can be used only by bots in less than 10 guilds.

## Get Guild Template

GET

/guilds/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

## Create Guild from Guild Template

POST

/guilds/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the guild (2-100 characters) |
| icon? | [image data](https://ptb.discord.com/developers/docs/reference#image-data) | base64 128x128 image for the guild icon |

Get Guild Templates[

](#get-guild-templates)
---------------------------------------------

GET/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates

Returns an array of [guild template](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object) objects. Requires the ```MANAGE_GUILD``` permission.

Create Guild Template[

](#create-guild-template)
-------------------------------------------------

POST/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates

Creates a template for the guild. Requires the ```MANAGE_GUILD``` permission. Returns the created [guild template](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object) object on success.

## Get Guild Templates

GET

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates

## Create Guild Template

POST

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the template (1-100 characters) |
| description? | ?string | description for the template (0-120 characters) |

Sync Guild Template[

](#sync-guild-template)
---------------------------------------------

PUT/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

Syncs the template to the guild's current state. Requires the ```MANAGE_GUILD``` permission. Returns the [guild template](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object) object on success.

Modify Guild Template[

](#modify-guild-template)
-------------------------------------------------

PATCH/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

Modifies the template's metadata. Requires the ```MANAGE_GUILD``` permission. Returns the [guild template](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object) object on success.

## Sync Guild Template

PUT

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

## Modify Guild Template

PATCH

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name? | string | name of the template (1-100 characters) |
| description? | ?string | description for the template (0-120 characters) |

Delete Guild Template[

](#delete-guild-template)
-------------------------------------------------

DELETE/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

Deletes the template. Requires the ```MANAGE_GUILD``` permission. Returns the deleted [guild template](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object) object on success.

## Delete Guild Template

DELETE

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/templates/[{template.code}](https://ptb.discord.com/developers/docs/resources/guild-template#guild-template-object)

