# Discord Developer Portal — Documentation — Webhook

## Webhook Resource

Webhooks are a low-effort way to post messages to channels in Discord. They do not require a bot user or authentication to use.

## Webhook Object

Used to represent a webhook.

## Webhook Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of the webhook |
| type | integer | the [type](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object-webhook-types) of the webhook |
| guild\_id? | ?snowflake | the guild id this webhook is for, if any |
| channel\_id | ?snowflake | the channel id this webhook is for, if any |
| user? | [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object | the user this webhook was created by (not returned when getting a webhook with its token) |
| name | ?string | the default name of the webhook |
| avatar | ?string | the default user avatar [hash](https://ptb.discord.com/developers/docs/reference#image-formatting) of the webhook |
| token? | string | the secure token of the webhook (returned for Incoming Webhooks) |
| application\_id | ?snowflake | the bot/OAuth2 application that created this webhook |
| source\_guild? \* | partial [guild](https://ptb.discord.com/developers/docs/resources/guild#guild-object) object | the guild of the channel that this webhook is following (returned for Channel Follower Webhooks) |
| source\_channel? \* | partial [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) object | the channel that this webhook is following (returned for Channel Follower Webhooks) |
| url? | string | the url used for executing the webhook (returned by the [webhooks](https://ptb.discord.com/developers/docs/topics/oauth2#webhooks) OAuth2 flow) |

\* These fields will be absent if the webhook creator has since lost access to the guild where the followed channel resides

## Webhook Types

| Value | Name | Description |
| --- | --- | --- |
| 1 | Incoming | Incoming Webhooks can post messages to channels with a generated token |
| 2 | Channel Follower | Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels |
| 3 | Application | Application webhooks are webhooks used with Interactions |

## Example Incoming Webhook

```
{
  "name": "test webhook",
  "type": 1,
  "channel_id": "199737254929760256",
  "token": "3d89bb7572e0fb30d8128367b3b1b44fecd1726de135cbe28a41f8b2f777c372ba2939e72279b94526ff5d1bd4358d65cf11",
  "avatar": null,
  "guild_id": "199737254929760256",
  "id": "223704706495545344",
  "application_id": null,
  "user": {
    "username": "test",
    "discriminator": "7479",
    "id": "190320984123768832",
    "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
    "public_flags": 131328
  }
}
```

## Example Channel Follower Webhook

```
{
  "type": 2,
  "id": "752831914402115456",
  "name": "Guildy name",
  "avatar": "bb71f469c158984e265093a81b3397fb",
  "channel_id": "561885260615255432",
  "guild_id": "56188498421443265",
  "application_id": null,
  "source_guild": {
    "id": "56188498421476534",
    "name": "Guildy name",
    "icon": "bb71f469c158984e265093a81b3397fb"
  },
  "source_channel": {
    "id": "5618852344134324",
    "name": "announcements"
  },
  "user": {
    "username": "test",
    "discriminator": "7479",
    "id": "190320984123768832",
    "avatar": "b004ec1740a63ca06ae2e14c5cee11f3",
    "public_flags": 131328
  }
}
```

## Example Application Webhook

```
{
  "type": 3,
  "id": "658822586720976555",
  "name": "Clyde",
  "avatar": "689161dc90ac261d00f1608694ac6bfd",
  "channel_id": null,
  "guild_id": null,
  "application_id": "658822586720976555"
}
```

Create Webhook[

](#create-webhook)
-----------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/webhooks

Creates a new webhook and returns a [webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object) object on success. Requires the ```MANAGE_WEBHOOKS``` permission. Fires a [Webhooks Update](https://ptb.discord.com/developers/docs/topics/gateway-events#webhooks-update) Gateway event.

An error will be returned if a webhook name (```name```) is not valid. A webhook name is valid if:

*   It does not contain the substrings ```clyde``` or ```discord``` (case-insensitive)
*   It follows the nickname guidelines in the [Usernames and Nicknames](https://ptb.discord.com/developers/docs/resources/user#usernames-and-nicknames) documentation, with an exception that webhook names can be up to 80 characters

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Create Webhook

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/webhooks

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the webhook (1-80 characters) |
| avatar? | ?[image data](https://ptb.discord.com/developers/docs/reference#image-data) | image for the default webhook avatar |

Get Channel Webhooks[

](#get-channel-webhooks)
-----------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/webhooks

Returns a list of channel [webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object) objects. Requires the ```MANAGE_WEBHOOKS``` permission.

Get Guild Webhooks[

](#get-guild-webhooks)
-------------------------------------------

GET/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/webhooks

Returns a list of guild [webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object) objects. Requires the ```MANAGE_WEBHOOKS``` permission.

Get Webhook[

](#get-webhook)
-----------------------------

GET/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

Returns the new [webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object) object for the given id.

Get Webhook with Token[

](#get-webhook-with-token)
---------------------------------------------------

GET/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

Same as above, except this call does not require authentication and returns no user in the webhook object.

Modify Webhook[

](#modify-webhook)
-----------------------------------

PATCH/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

Modify a webhook. Requires the ```MANAGE_WEBHOOKS``` permission. Returns the updated [webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object) object on success. Fires a [Webhooks Update](https://ptb.discord.com/developers/docs/topics/gateway-events#webhooks-update) Gateway event.

All parameters to this endpoint are optional

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Get Channel Webhooks

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/webhooks

## Get Guild Webhooks

GET

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/webhooks

## Get Webhook

GET

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

## Get Webhook with Token

GET

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

## Modify Webhook

PATCH

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | the default name of the webhook |
| avatar | ?[image data](https://ptb.discord.com/developers/docs/reference#image-data) | image for the default webhook avatar |
| channel\_id | snowflake | the new channel id this webhook should be moved to |

Modify Webhook with Token[

](#modify-webhook-with-token)
---------------------------------------------------------

PATCH/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

Same as above, except this call does not require authentication, does not accept a ```channel_id``` parameter in the body, and does not return a user in the webhook object.

Delete Webhook[

](#delete-webhook)
-----------------------------------

DELETE/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

Delete a webhook permanently. Requires the ```MANAGE_WEBHOOKS``` permission. Returns a ```204 No Content``` response on success. Fires a [Webhooks Update](https://ptb.discord.com/developers/docs/topics/gateway-events#webhooks-update) Gateway event.

This endpoint supports the ```X-Audit-Log-Reason``` header.

Delete Webhook with Token[

](#delete-webhook-with-token)
---------------------------------------------------------

DELETE/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

Same as above, except this call does not require authentication.

Execute Webhook[

](#execute-webhook)
-------------------------------------

POST/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

Refer to [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) for details on attachments and ```multipart/form-data``` requests. Returns a message or ```204 No Content``` depending on the ```wait``` query parameter.

Note that when sending a message, you must provide a value for at least one of ```content```, ```embeds```, ```components```, or ```file```.

If the webhook channel is a forum channel, you must provide either ```thread_id``` in the query string params, or ```thread_name``` in the JSON/form params. If ```thread_id``` is provided, the message will send in that thread. If ```thread_name``` is provided, a thread with that name will be created in the forum channel.

Discord may strip certain characters from message content, like invalid unicode characters or characters which cause unexpected message formatting. If you are passing user-generated strings into message content, consider sanitizing the data to prevent unexpected behavior and using ```allowed_mentions``` to prevent unexpected mentions.

## Modify Webhook with Token

PATCH

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

## Delete Webhook

DELETE

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

## Delete Webhook with Token

DELETE

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

## Execute Webhook

POST

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)

## Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| wait | boolean | waits for server confirmation of message send before response, and returns the created message body (defaults to ```false```; when ```false``` a message that is not saved does not return an error) | false |
| thread\_id | snowflake | Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. | false |

## JSON/Form Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| content | string | the message contents (up to 2000 characters) | one of content, file, embeds |
| username | string | override the default username of the webhook | false |
| avatar\_url | string | override the default avatar of the webhook | false |
| tts | boolean | true if this is a TTS message | false |
| embeds | array of up to 10 [embed](https://ptb.discord.com/developers/docs/resources/channel#embed-object) objects | embedded ```rich``` content | one of content, file, embeds |
| allowed\_mentions | [allowed mention object](https://ptb.discord.com/developers/docs/resources/channel#allowed-mentions-object) | allowed mentions for the message | false |
| components \* | array of [message component](https://ptb.discord.com/developers/docs/interactions/message-components#component-object) | the components to include with the message | false |
| files\[n\] \*\* | file contents | the contents of the file being sent | one of content, file, embeds |
| payload\_json \*\* | string | JSON encoded body of non-file params | ```multipart/form-data``` only |
| attachments \*\* | array of partial [attachment](https://ptb.discord.com/developers/docs/resources/channel#attachment-object) objects | attachment objects with filename and description | false |
| flags | integer | [message flags](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only ```SUPPRESS_EMBEDS``` can be set) | false |
| thread\_name | string | name of thread to create (requires the webhook channel to be a forum channel) | false |

\* Requires an application-owned webhook.

\*\* See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) for details.

For the webhook embed objects, you can set every field except ```type``` (it will be ```rich``` regardless of if you try to set it), ```provider```, ```video```, and any ```height```, ```width```, or ```proxy_url``` values for images.

Execute Slack-Compatible Webhook[

](#execute-slackcompatible-webhook)
----------------------------------------------------------------------

POST/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/slack

Refer to [Slack's documentation](https://api.slack.com/incoming-webhooks) for more information. We do not support Slack's ```channel```, ```icon_emoji```, ```mrkdwn```, or ```mrkdwn_in``` properties.

## Execute Slack-Compatible Webhook

POST

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/slack

## Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread\_id | snowflake | id of the thread to send the message in | false |
| wait | boolean | waits for server confirmation of message send before response (defaults to ```true```; when ```false``` a message that is not saved does not return an error) | false |

Execute GitHub-Compatible Webhook[

](#execute-githubcompatible-webhook)
------------------------------------------------------------------------

POST/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/github

Add a new webhook to your GitHub repo (in the repo's settings), and use this endpoint as the "Payload URL." You can choose what events your Discord channel receives by choosing the "Let me select individual events" option and selecting individual events for the new webhook you're configuring.

## Execute GitHub-Compatible Webhook

POST

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/github

## Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread\_id | snowflake | id of the thread to send the message in | false |
| wait | boolean | waits for server confirmation of message send before response (defaults to ```true```; when ```false``` a message that is not saved does not return an error) | false |

Get Webhook Message[

](#get-webhook-message)
---------------------------------------------

GET/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Returns a previously-sent webhook message from the same token. Returns a [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) object on success.

## Get Webhook Message

GET

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread\_id | snowflake | id of the thread the message is in | false |

Edit Webhook Message[

](#edit-webhook-message)
-----------------------------------------------

PATCH/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Edits a previously-sent webhook message from the same token. Returns a [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) object on success.

When the ```content``` field is edited, the ```mentions``` array in the message object will be reconstructed from scratch based on the new content. The ```allowed_mentions``` field of the edit request controls how this happens. If there is no explicit ```allowed_mentions``` in the edit request, the content will be parsed with default allowances, that is, without regard to whether or not an ```allowed_mentions``` was present in the request that originally created the message.

Refer to [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) for details on attachments and ```multipart/form-data``` requests. Any provided files will be appended to the message. To remove or replace files you will have to supply the ```attachments``` field which specifies the files to retain on the message after edit.

Starting with API v10, the ```attachments``` array must contain all attachments that should be present after edit, including retained and new attachments provided in the request body.

All parameters to this endpoint are optional and nullable.

## Edit Webhook Message

PATCH

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread\_id | snowflake | id of the thread the message is in | false |

## JSON/Form Params

| Field | Type | Description |
| --- | --- | --- |
| content | string | the message contents (up to 2000 characters) |
| embeds | array of up to 10 [embed](https://ptb.discord.com/developers/docs/resources/channel#embed-object) objects | embedded ```rich``` content |
| allowed\_mentions | [allowed mention object](https://ptb.discord.com/developers/docs/resources/channel#allowed-mentions-object) | allowed mentions for the message |
| components \* | array of [message component](https://ptb.discord.com/developers/docs/interactions/message-components#component-object) | the components to include with the message |
| files\[n\] \*\* | file contents | the contents of the file being sent/edited |
| payload\_json \*\* | string | JSON encoded body of non-file params (multipart/form-data only) |
| attachments \*\* | array of partial [attachment](https://ptb.discord.com/developers/docs/resources/channel#attachment-object) objects | attached files to keep and possible descriptions for new files |

\* Requires an application-owned webhook.

\*\* See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) for details.

Delete Webhook Message[

](#delete-webhook-message)
---------------------------------------------------

DELETE/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Deletes a message that was created by the webhook. Returns a ```204 No Content``` response on success.

## Delete Webhook Message

DELETE

/webhooks/[{webhook.id}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/[{webhook.token}](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## Query String Params

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| thread\_id | snowflake | id of the thread the message is in | false |

