# Discord Developer Portal — Documentation — Channel

## Channels Resource

## Channel Object

Represents a guild or DM channel within Discord.

## Channel Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of this channel |
| type | integer | the [type of channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types) |
| guild\_id? | snowflake | the id of the guild (may be missing for some channel objects received over gateway guild dispatches) |
| position? | integer | sorting position of the channel |
| permission\_overwrites? | array of [overwrite](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object) objects | explicit permission overwrites for members and roles |
| name? | ?string | the name of the channel (1-100 characters) |
| topic? | ?string | the channel topic (0-4096 characters for ```GUILD_FORUM``` channels, 0-1024 characters for all others) |
| nsfw? | boolean | whether the channel is nsfw |
| last\_message\_id? | ?snowflake | the id of the last message sent in this channel (or thread for ```GUILD_FORUM``` channels) (may not point to an existing or valid message or thread) |
| bitrate? | integer | the bitrate (in bits) of the voice channel |
| user\_limit? | integer | the user limit of the voice channel |
| rate\_limit\_per\_user?\* | integer | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission ```manage_messages``` or ```manage_channel```, are unaffected |
| recipients? | array of [user](https://ptb.discord.com/developers/docs/resources/user#user-object) objects | the recipients of the DM |
| icon? | ?string | icon hash of the group DM |
| owner\_id? | snowflake | id of the creator of the group DM or thread |
| application\_id? | snowflake | application id of the group DM creator if it is bot-created |
| managed? | boolean | for group DM channels: whether the channel is managed by an application via the ```gdm.join``` OAuth2 scope |
| parent\_id? | ?snowflake | for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created |
| last\_pin\_timestamp? | ?ISO8601 timestamp | when the last pinned message was pinned. This may be ```null``` in events such as ```GUILD_CREATE``` when a message is not pinned. |
| rtc\_region? | ?string | [voice region](https://ptb.discord.com/developers/docs/resources/voice#voice-region-object) id for the voice channel, automatic when set to null |
| video\_quality\_mode? | integer | the camera [video quality mode](https://ptb.discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of the voice channel, 1 when not present |
| message\_count?\*\* | integer | number of messages (not including the initial message or deleted messages) in a thread. |
| member\_count? | integer | an approximate count of users in a thread, stops counting at 50 |
| thread\_metadata? | a [thread metadata](https://ptb.discord.com/developers/docs/resources/channel#thread-metadata-object) object | thread-specific fields not needed by other channels |
| member? | a [thread member](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) object | thread member object for the current user, if they have joined the thread, only included on certain API endpoints |
| default\_auto\_archive\_duration? | integer | default duration, copied onto newly created threads, in minutes, threads will stop showing in the channel list after the specified period of inactivity, can be set to: 60, 1440, 4320, 10080 |
| permissions? | string | computed permissions for the invoking user in the channel, including overwrites, only included when part of the ```resolved``` data received on a slash command interaction |
| flags? | integer | [channel flags](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) |
| total\_message\_sent? | integer | number of messages ever sent in a thread, it's similar to ```message_count``` on message creation, but will not decrement the number when a message is deleted |
| available\_tags? | array of [tag](https://ptb.discord.com/developers/docs/resources/channel#forum-tag-object) objects | the set of tags that can be used in a ```GUILD_FORUM``` channel |
| applied\_tags? | array of snowflakes | the IDs of the set of tags that have been applied to a thread in a ```GUILD_FORUM``` channel |
| default\_reaction\_emoji? | ?[default reaction](https://ptb.discord.com/developers/docs/resources/channel#default-reaction-object) object | the emoji to show in the add reaction button on a thread in a ```GUILD_FORUM``` channel |
| default\_thread\_rate\_limit\_per\_user? | integer | the initial ```rate_limit_per_user``` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. |
| default\_sort\_order? | ?integer | the [default sort order type](https://ptb.discord.com/developers/docs/resources/channel#channel-object-sort-order-types) used to order posts in ```GUILD_FORUM``` channels. Defaults to ```null```, which indicates a preferred sort order hasn't been set by a channel admin |
| default\_forum\_layout? | integer | the [default forum layout view](https://ptb.discord.com/developers/docs/resources/channel#channel-object-forum-layout-types) used to display posts in ```GUILD_FORUM``` channels. Defaults to ```0```, which indicates a layout view has not been set by a channel admin |

\* ```rate_limit_per_user``` also applies to thread creation. Users can send one message and create one thread during each ```rate_limit_per_user``` interval.

\*\* For threads created before July 1, 2022, the message count is inaccurate when it's greater than 50.

## Channel Types

Type 10, 11 and 12 are only available in API v9 and above.

| Type | ID | Description |
| --- | --- | --- |
| GUILD\_TEXT | 0 | a text channel within a server |
| DM | 1 | a direct message between users |
| GUILD\_VOICE | 2 | a voice channel within a server |
| GROUP\_DM | 3 | a direct message between multiple users |
| GUILD\_CATEGORY | 4 | an [organizational category](https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101) that contains up to 50 channels |
| GUILD\_ANNOUNCEMENT | 5 | a channel that [users can follow and crosspost into their own server](https://support.discord.com/hc/en-us/articles/360032008192) (formerly news channels) |
| ANNOUNCEMENT\_THREAD | 10 | a temporary sub-channel within a GUILD\_ANNOUNCEMENT channel |
| PUBLIC\_THREAD | 11 | a temporary sub-channel within a GUILD\_TEXT or GUILD\_FORUM channel |
| PRIVATE\_THREAD | 12 | a temporary sub-channel within a GUILD\_TEXT channel that is only viewable by those invited and those with the MANAGE\_THREADS permission |
| GUILD\_STAGE\_VOICE | 13 | a voice channel for [hosting events with an audience](https://support.discord.com/hc/en-us/articles/1500005513722) |
| GUILD\_DIRECTORY | 14 | the channel in a [hub](https://support.discord.com/hc/en-us/articles/4406046651927-Discord-Student-Hubs-FAQ) containing the listed servers |
| GUILD\_FORUM | 15 | Channel that can only contain threads |

## Video Quality Modes

| Mode | Value | Description |
| --- | --- | --- |
| AUTO | 1 | Discord chooses the quality for optimal performance |
| FULL | 2 | 720p |

## Channel Flags

| Flag | Value | Description |
| --- | --- | --- |
| PINNED | 1 << 1 | this thread is pinned to the top of its parent ```GUILD_FORUM``` channel |
| REQUIRE\_TAG | 1 << 4 | whether a tag is required to be specified when creating a thread in a ```GUILD_FORUM``` channel. Tags are specified in the ```applied_tags``` field. |

## Sort Order Types

| Flag | Value | Description |
| --- | --- | --- |
| LATEST\_ACTIVITY | 0 | Sort forum posts by activity |
| CREATION\_DATE | 1 | Sort forum posts by creation time (from most recent to oldest) |

## Forum Layout Types

| Flag | Value | Description |
| --- | --- | --- |
| NOT\_SET | 0 | No default has been set for forum channel |
| LIST\_VIEW | 1 | Display posts as a list |
| GALLERY\_VIEW | 2 | Display posts as a collection of tiles |

## Example Guild Text Channel

```
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "name": "general",
  "type": 0,
  "position": 6,
  "permission_overwrites": [],
  "rate_limit_per_user": 2,
  "nsfw": true,
  "topic": "24/7 chat about how to gank Mike #2",
  "last_message_id": "155117677105512449",
  "parent_id": "399942396007890945",
  "default_auto_archive_duration": 60
}
```

## Example Guild Announcement Channel

Bots can post or publish messages in this type of channel if they have the proper permissions.

```
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "name": "important-news",
  "type": 5,
  "position": 6,
  "permission_overwrites": [],
  "nsfw": true,
  "topic": "Rumors about Half Life 3",
  "last_message_id": "155117677105512449",
  "parent_id": "399942396007890945",
  "default_auto_archive_duration": 60
}
```

## Example Guild Voice Channel

```
{
  "id": "155101607195836416",
  "last_message_id": "174629835082649376",
  "type": 2,
  "name": "ROCKET CHEESE",
  "position": 5,
  "parent_id": null,
  "bitrate": 64000,
  "user_limit": 0,
  "rtc_region": null,
  "guild_id": "41771983423143937",
  "permission_overwrites": [],
  "rate_limit_per_user": 0,
  "nsfw": false,
}
```

## Example DM Channel

```
{
  "last_message_id": "3343820033257021450",
  "type": 1,
  "id": "319674150115610528",
  "recipients": [
    {
      "username": "test",
      "discriminator": "9999",
      "id": "82198898841029460",
      "avatar": "33ecab261d4681afa4d85a04691c4a01"
    }
  ]
}
```

## Example Group DM Channel

```
{
  "name": "Some test channel",
  "icon": null,
  "recipients": [
    {
      "username": "test",
      "discriminator": "9999",
      "id": "82198898841029460",
      "avatar": "33ecab261d4681afa4d85a04691c4a01"
    },
    {
      "username": "test2",
      "discriminator": "9999",
      "id": "82198810841029460",
      "avatar": "33ecab261d4681afa4d85a10691c4a01"
    }
  ],
  "last_message_id": "3343820033257021450",
  "type": 3,
  "id": "319674150115710528",
  "owner_id": "82198810841029460"
}
```

## Example Channel Category

```
{
  "permission_overwrites": [],
  "name": "Test",
  "parent_id": null,
  "nsfw": false,
  "position": 0,
  "guild_id": "290926798629997250",
  "type": 4,
  "id": "399942396007890945"
}
```

## Example Thread Channel

[Threads](https://ptb.discord.com/developers/docs/topics/threads) can be either ```archived``` or ```active```. Archived threads are generally immutable. To send a message or add a reaction, a thread must first be unarchived. The API will helpfully automatically unarchive a thread when sending a message in that thread.

Unlike with channels, the API will only sync updates to users about threads the current user can view. When receiving a [guild create](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-create) payload, the API will only include active threads the current user can view. Threads inside of private channels are completely private to the members of that private channel. As such, when gaining access to a channel the API sends a [thread list sync](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-list-sync), which includes all active threads in that channel.

Threads also track membership. Users must be added to a thread before sending messages in them. The API will helpfully automatically add users to a thread when sending a message in that thread.

Guilds have limits on the number of active threads and members per thread. Once these are reached additional threads cannot be created or unarchived, and users cannot be added. Threads do not count against the per-guild channel limit.

The [threads](https://ptb.discord.com/developers/docs/topics/threads) topic has some more information.

```
{
  "id": "41771983423143937",
  "guild_id": "41771983423143937",
  "parent_id": "41771983423143937",
  "owner_id": "41771983423143937",
  "name": "don't buy dota-2",
  "type": 11,
  "last_message_id": "155117677105512449",
  "message_count": 1,
  "member_count": 5,
  "rate_limit_per_user": 2,
  "thread_metadata": {
    "archived": false,
    "auto_archive_duration": 1440,
    "archive_timestamp": "2021-04-12T23:40:39.855793+00:00",
    "locked": false
  },
  "total_message_sent": 1
}
```

## Message Object

Represents a message sent in a channel within Discord.

## Message Structure

Fields specific to the ```MESSAGE_CREATE``` and ```MESSAGE_UPDATE``` events are listed in the [Gateway documentation](https://ptb.discord.com/developers/docs/topics/gateway-events#message-create).

```content```, ```embeds```, ```attachments```, and ```components``` require the [```MESSAGE_CONTENT``` intent](https://ptb.discord.com/developers/docs/topics/gateway#message-content-intent) to receive non-empty values.

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | id of the message |
| channel\_id | snowflake | id of the channel the message was sent in |
| author\* | [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object | the author of this message (not guaranteed to be a valid user, see below) |
| content\*\* | string | contents of the message |
| timestamp | ISO8601 timestamp | when this message was sent |
| edited\_timestamp | ?ISO8601 timestamp | when this message was edited (or null if never) |
| tts | boolean | whether this was a TTS message |
| mention\_everyone | boolean | whether this message mentions everyone |
| mentions | array of [user](https://ptb.discord.com/developers/docs/resources/user#user-object) objects | users specifically mentioned in the message |
| mention\_roles | array of [role](https://ptb.discord.com/developers/docs/topics/permissions#role-object) object ids | roles specifically mentioned in this message |
| mention\_channels?\*\*\* | array of [channel mention](https://ptb.discord.com/developers/docs/resources/channel#channel-mention-object) objects | channels specifically mentioned in this message |
| attachments\*\* | array of [attachment](https://ptb.discord.com/developers/docs/resources/channel#attachment-object) objects | any attached files |
| embeds\*\* | array of [embed](https://ptb.discord.com/developers/docs/resources/channel#embed-object) objects | any embedded content |
| reactions? | array of [reaction](https://ptb.discord.com/developers/docs/resources/channel#reaction-object) objects | reactions to the message |
| nonce? | integer or string | used for validating a message was sent |
| pinned | boolean | whether this message is pinned |
| webhook\_id? | snowflake | if the message is generated by a webhook, this is the webhook's id |
| type | integer | [type of message](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-types) |
| activity? | [message activity](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-activity-structure) object | sent with Rich Presence-related chat embeds |
| application? | partial [application](https://ptb.discord.com/developers/docs/resources/application#application-object) object | sent with Rich Presence-related chat embeds |
| application\_id? | snowflake | if the message is an [Interaction](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding) or application-owned webhook, this is the id of the application |
| message\_reference? | [message reference](https://ptb.discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure) object | data showing the source of a crosspost, channel follow add, pin, or reply message |
| flags? | integer | [message flags](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) |
| referenced\_message?\*\*\*\* | ?[message object](https://ptb.discord.com/developers/docs/resources/channel#message-object) | the message associated with the message\_reference |
| interaction? | [message interaction object](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure) | sent if the message is a response to an [Interaction](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding) |
| thread? | [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) object | the thread that was started from this message, includes [thread member](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) object |
| components?\*\* | array of [message components](https://ptb.discord.com/developers/docs/interactions/message-components#component-object) | sent if the message contains components like buttons, action rows, or other interactive components |
| sticker\_items? | array of [message sticker item objects](https://ptb.discord.com/developers/docs/resources/sticker#sticker-item-object) | sent if the message contains stickers |
| stickers? | array of [sticker](https://ptb.discord.com/developers/docs/resources/sticker#sticker-object) objects | Deprecated the stickers sent with the message |
| position? | integer | A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread, it can be used to estimate the relative position of the message in a thread in company with ```total_message_sent``` on parent thread |
| role\_subscription\_data? | [role subscription data](https://ptb.discord.com/developers/docs/resources/channel#role-subscription-data-object) object | data of the role subscription purchase or renewal that prompted this ROLE\_SUBSCRIPTION\_PURCHASE message |

\* The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the ```webhook_id``` on the message object.

\*\* An app will receive empty values in the ```content```, ```embeds```, ```attachments```, and ```components``` fields if they have not configured (or been approved for) the [```MESSAGE_CONTENT``` privileged intent (```1 << 15```)](https://ptb.discord.com/developers/docs/topics/gateway#message-content-intent).

\*\*\* Not all channel mentions in a message will appear in ```mention_channels```. Only textual channels that are visible to everyone in a lurkable guild will ever be included. Only crossposted messages (via Channel Following) currently include ```mention_channels``` at all. If no mentions in the message meet these requirements, this field will not be sent.

\*\*\*\* This field is only returned for messages with a ```type``` of ```19``` (REPLY) or ```21``` (THREAD\_STARTER\_MESSAGE). If the message is a reply but the ```referenced_message``` field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.

## Message Types

Type ```19``` and ```20``` are only available in API v8 and above. In v6, they are represented as type ```0```. Additionally, type ```21``` is only available in API v9 and above.

| Type | Value | Deletable |
| --- | --- | --- |
| DEFAULT | 0 | true |
| RECIPIENT\_ADD | 1 | false |
| RECIPIENT\_REMOVE | 2 | false |
| CALL | 3 | false |
| CHANNEL\_NAME\_CHANGE | 4 | false |
| CHANNEL\_ICON\_CHANGE | 5 | false |
| CHANNEL\_PINNED\_MESSAGE | 6 | true |
| USER\_JOIN | 7 | true |
| GUILD\_BOOST | 8 | true |
| GUILD\_BOOST\_TIER\_1 | 9 | true |
| GUILD\_BOOST\_TIER\_2 | 10 | true |
| GUILD\_BOOST\_TIER\_3 | 11 | true |
| CHANNEL\_FOLLOW\_ADD | 12 | true |
| GUILD\_DISCOVERY\_DISQUALIFIED | 14 | false |
| GUILD\_DISCOVERY\_REQUALIFIED | 15 | false |
| GUILD\_DISCOVERY\_GRACE\_PERIOD\_INITIAL\_WARNING | 16 | false |
| GUILD\_DISCOVERY\_GRACE\_PERIOD\_FINAL\_WARNING | 17 | false |
| THREAD\_CREATED | 18 | true |
| REPLY | 19 | true |
| CHAT\_INPUT\_COMMAND | 20 | true |
| THREAD\_STARTER\_MESSAGE | 21 | false |
| GUILD\_INVITE\_REMINDER | 22 | true |
| CONTEXT\_MENU\_COMMAND | 23 | true |
| AUTO\_MODERATION\_ACTION | 24 | true\* |
| ROLE\_SUBSCRIPTION\_PURCHASE | 25 | true |
| INTERACTION\_PREMIUM\_UPSELL | 26 | true |
| STAGE\_START | 27 | true |
| STAGE\_END | 28 | true |
| STAGE\_SPEAKER | 29 | true |
| STAGE\_TOPIC | 31 | true |
| GUILD\_APPLICATION\_PREMIUM\_SUBSCRIPTION | 32 | false |

\* Can only be deleted by members with ```MANAGE_MESSAGES``` permission

## Message Activity Structure

| Field | Type | Description |
| --- | --- | --- |
| type | integer | [type of message activity](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-activity-types) |
| party\_id? | string | party\_id from a [Rich Presence event](https://ptb.discord.com/developers/docs/rich-presence/how-to#updating-presence-update-presence-payload-fields) |

## Message Activity Types

| Type | Value |
| --- | --- |
| JOIN | 1 |
| SPECTATE | 2 |
| LISTEN | 3 |
| JOIN\_REQUEST | 5 |

## Message Flags

| Flag | Value | Description |
| --- | --- | --- |
| CROSSPOSTED | 1 << 0 | this message has been published to subscribed channels (via Channel Following) |
| IS\_CROSSPOST | 1 << 1 | this message originated from a message in another channel (via Channel Following) |
| SUPPRESS\_EMBEDS | 1 << 2 | do not include any embeds when serializing this message |
| SOURCE\_MESSAGE\_DELETED | 1 << 3 | the source message for this crosspost has been deleted (via Channel Following) |
| URGENT | 1 << 4 | this message came from the urgent message system |
| HAS\_THREAD | 1 << 5 | this message has an associated thread, with the same id as the message |
| EPHEMERAL | 1 << 6 | this message is only visible to the user who invoked the Interaction |
| LOADING | 1 << 7 | this message is an Interaction Response and the bot is "thinking" |
| FAILED\_TO\_MENTION\_SOME\_ROLES\_IN\_THREAD | 1 << 8 | this message failed to mention some roles and add their members to the thread |
| SUPPRESS\_NOTIFICATIONS | 1 << 12 | this message will not trigger push and desktop notifications |
| IS\_VOICE\_MESSAGE | 1 << 13 | this message is a voice message |

## Example Message

```
{
  "reactions": [
    {
      "count": 1,
      "me": false,
      "emoji": {
        "id": null,
        "name": "🔥"
      }
    }
  ],
  "attachments": [],
  "tts": false,
  "embeds": [],
  "timestamp": "2017-07-11T17:27:07.299000+00:00",
  "mention_everyone": false,
  "id": "334385199974967042",
  "pinned": false,
  "edited_timestamp": null,
  "author": {
    "username": "Mason",
    "discriminator": "9999",
    "id": "53908099506183680",
    "avatar": "a_bab14f271d565501444b2ca3be944b25"
  },
  "mention_roles": [],
  "content": "Supa Hot",
  "channel_id": "290926798999357250",
  "mentions": [],
  "type": 0
}
```

## Example Crossposted Message

```
{
  "reactions": [
    {
      "count": 1,
      "me": false,
      "emoji": {
        "id": null,
        "name": "🔥"
      }
    }
  ],
  "attachments": [],
  "tts": false,
  "embeds": [],
  "timestamp": "2017-07-11T17:27:07.299000+00:00",
  "mention_everyone": false,
  "id": "334385199974967042",
  "pinned": false,
  "edited_timestamp": null,
  "author": {
    "username": "Mason",
    "discriminator": "9999",
    "id": "53908099506183680",
    "avatar": "a_bab14f271d565501444b2ca3be944b25"
  },
  "mention_roles": [],
  "mention_channels": [
    {
      "id": "278325129692446722",
      "guild_id": "278325129692446720",
      "name": "big-news",
      "type": 5
    }
  ],
  "content": "Big news! In this <#278325129692446722> channel!",
  "channel_id": "290926798999357250",
  "mentions": [],
  "type": 0,
  "flags": 2,
  "message_reference": {
    "channel_id": "278325129692446722",
    "guild_id": "278325129692446720",
    "message_id": "306588351130107906"
  }
}
```

## Message Reference Object

## Message Reference Structure

| Field | Type | Description |
| --- | --- | --- |
| message\_id? | snowflake | id of the originating message |
| channel\_id? \* | snowflake | id of the originating message's channel |
| guild\_id? | snowflake | id of the originating message's guild |
| fail\_if\_not\_exists? | boolean | when sending, whether to error if the referenced message doesn't exist instead of sending as a normal (non-reply) message, default true |

\* ```channel_id``` is optional when creating a reply, but will always be present when receiving an event/response that includes this data model.

## Message Types

There are multiple message types that have a message\_reference object. Since message references are generic attribution to a previous message, there will be more types of messages which have this information in the future.

## Crosspost messages

*   These are messages that originated from another channel (IS\_CROSSPOST flag).
*   These messages have all three fields, which point to the original message that was crossposted.

## Channel Follow Add messages

*   These are automatic messages sent when a channel is followed into the current channel (type 12).
*   These messages have the ```channel_id``` and ```guild_id``` fields, which point to the followed announcement channel.

## Pin messages

*   These are automatic messages sent when a message is pinned (type 6).
*   These messages have ```message_id``` and ```channel_id```, and ```guild_id``` if it is in a guild, which point to the message that was pinned.

## Replies

*   These are messages replying to a previous message (type 19).
*   These messages have ```message_id``` and ```channel_id```, and ```guild_id``` if it is in a guild, which point to the message that was replied to. The channel\_id and guild\_id will be the same as the reply.
*   Replies are created by including a message\_reference when sending a message. When sending, only ```message_id``` is required.

## Thread Created messages

*   These are automatic messages sent when a public thread is created from an old message or without a message (type 18).
*   These messages have the ```channel_id``` and ```guild_id``` fields, which point to the created thread channel.

## Thread starter messages

*   These are the first message in public threads created from messages. They point back to the message in the parent channel from which the thread was started. (type 21)
*   These messages have ```message_id```, ```channel_id```, and ```guild_id```.
*   These messages will never have content, embeds, or attachments, mainly just the ```message_reference``` and ```referenced_message``` fields.

## Voice Messages

Voice messages are messages with the ```IS_VOICE_MESSAGE``` flag. They have the following properties.

*   They cannot be edited.
*   Only a single audio attachment is allowed. No content, stickers, etc...
*   The [attachment](https://ptb.discord.com/developers/docs/resources/channel#attachment-object) has additional fields: ```duration_secs``` and ```waveform```.

The ```waveform``` is intended to be a preview of the entire voice message, with 1 byte per datapoint encoded in base64. Clients sample the recording at most once per 100 milliseconds, but will downsample so that no more than 256 datapoints are in the waveform.

As of 2023-04-14, clients upload a 1 channel, 48000 Hz, 32kbps Opus stream in an OGG container. The encoding, and the waveform details, are an implementation detail and may change without warning or documentation.

## Followed Channel Object

## Followed Channel Structure

| Field | Type | Description |
| --- | --- | --- |
| channel\_id | snowflake | source channel id |
| webhook\_id | snowflake | created target webhook id |

## Reaction Object

## Reaction Structure

| Field | Type | Description |
| --- | --- | --- |
| count | integer | times this emoji has been used to react |
| me | boolean | whether the current user reacted using this emoji |
| emoji | partial [emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) object | emoji information |

## Overwrite Object

See [permissions](https://ptb.discord.com/developers/docs/topics/permissions#permissions) for more information about the ```allow``` and ```deny``` fields.

## Overwrite Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | role or user id |
| type | int | either 0 (role) or 1 (member) |
| allow | string | permission bit set |
| deny | string | permission bit set |

## Thread Metadata Object

The thread metadata object contains a number of thread-specific channel fields that are not needed by other channel types.

## Thread Metadata Structure

Starting on March 6, threads will be able to be locked and archived independently. Read details about the upcoming changes to the ```locked``` field in the [Change Log entry](https://ptb.discord.com/developers/docs/change-log#update-to-locked-threads).

| Field | Type | Description |
| --- | --- | --- |
| archived | boolean | whether the thread is archived |
| auto\_archive\_duration | integer | the thread will stop showing in the channel list after ```auto_archive_duration``` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 |
| archive\_timestamp | ISO8601 timestamp | timestamp when the thread's archive status was last changed, used for calculating recent activity |
| locked | boolean | whether the thread is locked; when a thread is locked, only users with MANAGE\_THREADS can unarchive it |
| invitable? | boolean | whether non-moderators can add other non-moderators to a thread; only available on private threads |
| create\_timestamp? | ?ISO8601 timestamp | timestamp when the thread was created; only populated for threads created after 2022-01-09 |

## Thread Member Object

A thread member object contains information about a user that has joined a thread.

## Thread Member Structure

| Field | Type | Description |
| --- | --- | --- |
| id? \* | snowflake | ID of the thread |
| user\_id? \* | snowflake | ID of the user |
| join\_timestamp | ISO8601 timestamp | Time the user last joined the thread |
| flags | integer | Any user-thread settings, currently only used for notifications |
| member? \* \*\* | [guild member](https://ptb.discord.com/developers/docs/resources/guild#guild-member-object) object | Additional information about the user |

\* These fields are omitted on the member sent within each thread in the [GUILD\_CREATE](https://ptb.discord.com/developers/docs/topics/gateway-events#guild-create) event.

\*\* The ```member``` field is only present when ```with_member``` is set to ```true``` when calling [List Thread Members](https://ptb.discord.com/developers/docs/resources/channel#list-thread-members) or [Get Thread Member](https://ptb.discord.com/developers/docs/resources/channel#get-thread-member).

## Default Reaction Object

An object that specifies the emoji to use as the default way to react to a forum post. Exactly one of ```emoji_id``` and ```emoji_name``` must be set.

## Default Reaction Structure

| Field | Type | Description |
| --- | --- | --- |
| emoji\_id | ?snowflake | the id of a guild's custom emoji |
| emoji\_name | ?string | the unicode character of the emoji |

## Forum Tag Object

An object that represents a tag that is able to be applied to a thread in a ```GUILD_FORUM``` channel.

## Forum Tag Structure

When updating a ```GUILD_FORUM``` channel, tag objects in ```available_tags``` only require the ```name``` field.

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of the tag |
| name | string | the name of the tag (0-20 characters) |
| moderated | boolean | whether this tag can only be added to or removed from threads by a member with the ```MANAGE_THREADS``` permission |
| emoji\_id | ?snowflake | the id of a guild's custom emoji \* |
| emoji\_name | ?string | the unicode character of the emoji \* |

\* At most one of ```emoji_id``` and ```emoji_name``` may be set to a non-null value.

## Embed Object

## Embed Structure

| Field | Type | Description |
| --- | --- | --- |
| title? | string | title of embed |
| type? | string | [type of embed](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-types) (always "rich" for webhook embeds) |
| description? | string | description of embed |
| url? | string | url of embed |
| timestamp? | ISO8601 timestamp | timestamp of embed content |
| color? | integer | color code of the embed |
| footer? | [embed footer](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure) object | footer information |
| image? | [embed image](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-image-structure) object | image information |
| thumbnail? | [embed thumbnail](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-thumbnail-structure) object | thumbnail information |
| video? | [embed video](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-video-structure) object | video information |
| provider? | [embed provider](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-provider-structure) object | provider information |
| author? | [embed author](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-author-structure) object | author information |
| fields? | array of [embed field](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-field-structure) objects | fields information |

## Embed Types

Embed types are "loosely defined" and, for the most part, are not used by our clients for rendering. Embed attributes power what is rendered. Embed types should be considered deprecated and might be removed in a future API version.

| Type | Description |
| --- | --- |
| rich | generic embed rendered from embed attributes |
| image | image embed |
| video | video embed |
| gifv | animated gif image embed rendered as a video embed |
| article | article embed |
| link | link embed |

## Embed Thumbnail Structure

| Field | Type | Description |
| --- | --- | --- |
| url | string | source url of thumbnail (only supports http(s) and attachments) |
| proxy\_url? | string | a proxied url of the thumbnail |
| height? | integer | height of thumbnail |
| width? | integer | width of thumbnail |

## Embed Video Structure

| Field | Type | Description |
| --- | --- | --- |
| url? | string | source url of video |
| proxy\_url? | string | a proxied url of the video |
| height? | integer | height of video |
| width? | integer | width of video |

## Embed Image Structure

| Field | Type | Description |
| --- | --- | --- |
| url | string | source url of image (only supports http(s) and attachments) |
| proxy\_url? | string | a proxied url of the image |
| height? | integer | height of image |
| width? | integer | width of image |

## Embed Provider Structure

| Field | Type | Description |
| --- | --- | --- |
| name? | string | name of provider |
| url? | string | url of provider |

## Embed Author Structure

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of author |
| url? | string | url of author (only supports http(s)) |
| icon\_url? | string | url of author icon (only supports http(s) and attachments) |
| proxy\_icon\_url? | string | a proxied url of author icon |

## Embed Footer Structure

| Field | Type | Description |
| --- | --- | --- |
| text | string | footer text |
| icon\_url? | string | url of footer icon (only supports http(s) and attachments) |
| proxy\_icon\_url? | string | a proxied url of footer icon |

## Embed Field Structure

| Field | Type | Description |
| --- | --- | --- |
| name | string | name of the field |
| value | string | value of the field |
| inline? | boolean | whether or not this field should display inline |

## Embed Limits

To facilitate showing rich content, rich embeds do not follow the traditional limits of message content. However, some limits are still in place to prevent excessively large embeds. The following table describes the limits:

All of the following limits are measured inclusively. Leading and trailing whitespace characters are not included (they are trimmed automatically).

| Field | Limit |
| --- | --- |
| title | 256 characters |
| description | 4096 characters |
| fields | Up to 25 [field](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-field-structure) objects |
| [field.name](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-field-structure) | 256 characters |
| [field.value](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-field-structure) | 1024 characters |
| [footer.text](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-footer-structure) | 2048 characters |
| [author.name](https://ptb.discord.com/developers/docs/resources/channel#embed-object-embed-author-structure) | 256 characters |

Additionally, the combined sum of characters in all ```title```, ```description```, ```field.name```, ```field.value```, ```footer.text```, and ```author.name``` fields across all embeds attached to a message must not exceed 6000 characters. Violating any of these constraints will result in a ```Bad Request``` response.

Embeds are deduplicated by URL. If a message contains multiple embeds with the same URL, only the first is shown.

## Attachment Object

## Attachment Structure

For the ```attachments``` array in Message Create/Edit requests, only the ```id``` is required.

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | attachment id |
| filename | string | name of file attached |
| description? | string | description for the file (max 1024 characters) |
| content\_type? | string | the attachment's [media type](https://en.wikipedia.org/wiki/Media_type) |
| size | integer | size of file in bytes |
| url | string | source url of file |
| proxy\_url | string | a proxied url of file |
| height? | ?integer | height of file (if image) |
| width? | ?integer | width of file (if image) |
| ephemeral? \* | boolean | whether this attachment is ephemeral |
| duration\_secs? | float | the duration of the audio file (currently for voice messages) |
| waveform? | string | base64 encoded bytearray representing a sampled waveform (currently for voice messages) |

\* Ephemeral attachments will automatically be removed after a set period of time. Ephemeral attachments on messages are guaranteed to be available as long as the message itself exists.

## Channel Mention Object

## Channel Mention Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | id of the channel |
| guild\_id | snowflake | id of the guild containing the channel |
| type | integer | the [type of channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types) |
| name | string | the name of the channel |

## Allowed Mentions Object

The allowed mention field allows for more granular control over mentions without various hacks to the message content. This will always validate against message content to avoid phantom pings (e.g. to ping everyone, you must still have ```@everyone``` in the message content), and check against user/bot permissions.

## Allowed Mention Types

| Type | Value | Description |
| --- | --- | --- |
| Role Mentions | "roles" | Controls role mentions |
| User Mentions | "users" | Controls user mentions |
| Everyone Mentions | "everyone" | Controls @everyone and @here mentions |

## Allowed Mentions Structure

| Field | Type | Description |
| --- | --- | --- |
| parse | array of allowed mention types | An array of [allowed mention types](https://ptb.discord.com/developers/docs/resources/channel#allowed-mentions-object-allowed-mention-types) to parse from the content. |
| roles | list of snowflakes | Array of role\_ids to mention (Max size of 100) |
| users | list of snowflakes | Array of user\_ids to mention (Max size of 100) |
| replied\_user | boolean | For replies, whether to mention the author of the message being replied to (default false) |

## Allowed Mentions Reference

Due to the complexity of possibilities, we have included a set of examples and behavior for the allowed mentions field.

If ```allowed_mentions``` is not passed in (i.e. the key does not exist), the mentions will be parsed via the content. This corresponds with existing behavior.

In the example below we would ping @here (and also @role124 and @user123)

```
{
  "content": "@here Hi there from <@123>, cc <@&124>"
}
```

To suppress all mentions in a message use:

```
{
  "content": "@everyone hi there, <@&123>",
  "allowed_mentions": {
    "parse": []
  }
}
```

This will suppress all mentions in the message (no @everyone or user mention).

The ```parse``` field is mutually exclusive with the other fields. In the example below, we would ping users ```123``` and role ```124```, but not @everyone. Note that passing a ```Falsy``` value (\[\], null) into the "users" field does not trigger a validation error.

```
{
  "content": "@everyone <@123> <@&124>",
  "allowed_mentions": {
    "parse": ["users", "roles"],
    "users": []
  }
}
```

In the next example, we would ping @everyone, (and also users ```123``` and ```124``` if they suppressed @everyone mentions), but we would not ping any roles.

```
{
  "content": "@everyone <@123> <@124> <@125> <@&200>",
  "allowed_mentions": {
    "parse": ["everyone"],
    "users": ["123", "124"]
  }
}
```

Due to possible ambiguities, not all configurations are valid. An invalid configuration is as follows

```
{
  "content": "@everyone <@123> <@124> <@125> <@&200>",
  "allowed_mentions": {
    "parse": ["users"],
    "users": ["123", "124"]
  }
}
```

Because ```parse: ["users"]``` and ```users: [123, 124]``` are both present, we would throw a validation error. This is because the conditions cannot be fulfilled simultaneously (they are mutually exclusive).

Any entities with an ID included in the list of IDs can be mentioned. Note that the IDs of entities not present in the message's content will simply be ignored. e.g. The following example is valid, and would mention user 123, but not user 125 since there is no mention of user 125 in the content.

```
{
  "content": "<@123> Time for some memes.",
  "allowed_mentions": {
    "users": ["123", "125"]
  }
}
```

## Role Subscription Data Object

## Role Subscription Data Object Structure

| Field | Type | Description |
| --- | --- | --- |
| role\_subscription\_listing\_id | snowflake | the id of the sku and listing that the user is subscribed to |
| tier\_name | string | the name of the tier that the user is subscribed to |
| total\_months\_subscribed | integer | the cumulative number of months that the user has been subscribed for |
| is\_renewal | boolean | whether this notification is for a renewal rather than a new purchase |

Get Channel[

](#get-channel)
-----------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

Get a channel by ID. Returns a [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) object. If the channel is a thread, a [thread member](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) object is included in the returned result.

Modify Channel[

](#modify-channel)
-----------------------------------

PATCH/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

Update a channel's settings. Returns a [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. All JSON parameters are optional.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Get Channel

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

## Modify Channel

PATCH

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

## JSON Params (Group DM)

Fires a [Channel Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-update) Gateway event.

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| icon | binary | base64 encoded icon |

## JSON Params (Guild channel)

Requires the ```MANAGE_CHANNELS``` permission for the guild. Fires a [Channel Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-update) Gateway event. If modifying a category, individual [Channel Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-update) events will fire for each child channel that also changes. If modifying permission overwrites, the ```MANAGE_ROLES``` permission is required. Only permissions your bot has in the guild or parent channel (if applicable) can be allowed/denied (unless your bot has a ```MANAGE_ROLES``` overwrite in the channel).

| Field | Type | Description | Channel Type |
| --- | --- | --- | --- |
| name | string | 1-100 character channel name | All |
| type | integer | the [type of channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types); only conversion between text and announcement is supported and only in guilds with the "NEWS" feature | Text, Announcement |
| position | ?integer | the position of the channel in the left-hand listing | All |
| topic | ?string | 0-1024 character channel topic (0-4096 characters for ```GUILD_FORUM``` channels) | Text, Announcement, Forum |
| nsfw | ?boolean | whether the channel is nsfw | Text, Voice, Announcement, Stage, Forum |
| rate\_limit\_per\_user | ?integer | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission ```manage_messages``` or ```manage_channel```, are unaffected | Text, Forum |
| bitrate\* | ?integer | the bitrate (in bits) of the voice or stage channel; min 8000 | Voice, Stage |
| user\_limit | ?integer | the user limit of the voice or stage channel, max 99 for voice channels and 10,000 for stage channels (0 refers to no limit) | Voice, Stage |
| permission\_overwrites\*\* | ?array of partial [overwrite](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object) objects | channel or category-specific permissions | All |
| parent\_id | ?snowflake | id of the new parent category for a channel | Text, Voice, Announcement, Stage, Forum |
| rtc\_region | ?string | channel [voice region](https://ptb.discord.com/developers/docs/resources/voice#voice-region-object) id, automatic when set to null | Voice, Stage |
| video\_quality\_mode | ?integer | the camera [video quality mode](https://ptb.discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of the voice channel | Voice, Stage |
| default\_auto\_archive\_duration | ?integer | the default duration that the clients use (not the API) for newly created threads in the channel, in minutes, to automatically archive the thread after recent activity | Text, Announcement, Forum |
| flags? | integer | [channel flags](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field). Currently only ```REQUIRE_TAG``` (```1 << 4```) is supported. | Forum |
| available\_tags? | array of [tag](https://ptb.discord.com/developers/docs/resources/channel#forum-tag-object) objects | the set of tags that can be used in a ```GUILD_FORUM``` channel; limited to 20 | Forum |
| default\_reaction\_emoji? | ?[default reaction](https://ptb.discord.com/developers/docs/resources/channel#default-reaction-object) object | the emoji to show in the add reaction button on a thread in a ```GUILD_FORUM``` channel | Forum |
| default\_thread\_rate\_limit\_per\_user? | integer | the initial ```rate_limit_per_user``` to set on newly created threads in a channel. this field is copied to the thread at creation time and does not live update. | Text, Forum |
| default\_sort\_order? | ?integer | the [default sort order type](https://ptb.discord.com/developers/docs/resources/channel#channel-object-sort-order-types) used to order posts in ```GUILD_FORUM``` channels | Forum |
| default\_forum\_layout? | integer | the [default forum layout type](https://ptb.discord.com/developers/docs/resources/channel#channel-object-forum-layout-types) used to display posts in ```GUILD_FORUM``` channels | Forum |

\* For voice channels, normal servers can set bitrate up to 96000, servers with Boost level 1 can set up to 128000, servers with Boost level 2 can set up to 256000, and servers with Boost level 3 or the ```VIP_REGIONS``` [guild feature](https://ptb.discord.com/developers/docs/resources/guild#guild-object-guild-features) can set up to 384000. For stage channels, bitrate can be set up to 64000.

\*\* In each overwrite object, the ```allow``` and ```deny``` keys can be omitted or set to ```null```, which both default to ```"0"```.

## JSON Params (Thread)

When setting ```archived``` to ```false```, when ```locked``` is also ```false```, only the ```SEND_MESSAGES``` permission is required.

Otherwise, requires the ```MANAGE_THREADS``` permission. Fires a [Thread Update](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-update) Gateway event. Requires the thread to have ```archived``` set to ```false``` or be set to ```false``` in the request.

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| archived | boolean | whether the thread is archived |
| auto\_archive\_duration | integer | the thread will stop showing in the channel list after ```auto_archive_duration``` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 |
| locked | boolean | whether the thread is locked; when a thread is locked, only users with MANAGE\_THREADS can unarchive it |
| invitable | boolean | whether non-moderators can add other non-moderators to a thread; only available on private threads |
| rate\_limit\_per\_user | ?integer | amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission ```manage_messages```, ```manage_thread```, or ```manage_channel```, are unaffected |
| flags? | integer | [channel flags](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field); ```PINNED``` can only be set for threads in forum channels |
| applied\_tags? | array of snowflakes | the IDs of the set of tags that have been applied to a thread in a ```GUILD_FORUM``` channel; limited to 5 |

Delete/Close Channel[

](#deleteclose-channel)
----------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

Delete a channel, or close a private message. Requires the ```MANAGE_CHANNELS``` permission for the guild, or ```MANAGE_THREADS``` if the channel is a thread. Deleting a category does not delete its child channels; they will have their ```parent_id``` removed and a [Channel Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-update) Gateway event will fire for each of them. Returns a [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) object on success. Fires a [Channel Delete](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-delete) Gateway event (or [Thread Delete](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-delete) if the channel was a thread).

Deleting a guild channel cannot be undone. Use this with caution, as it is impossible to undo this action when performed on a guild channel. In contrast, when used with a private message, it is possible to undo the action by opening a private message with the recipient again.

For Community guilds, the Rules or Guidelines channel and the Community Updates channel cannot be deleted.

This endpoint supports the ```X-Audit-Log-Reason``` header.

Get Channel Messages[

](#get-channel-messages)
-----------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages

Retrieves the messages in a channel. Returns an array of [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) objects on success.

If operating on a guild channel, this endpoint requires the current user to have the ```VIEW_CHANNEL``` permission. If the channel is a voice channel, they must also have the ```CONNECT``` permission.

If the current user is missing the ```READ_MESSAGE_HISTORY``` permission in the channel, then no messages will be returned.

The ```before```, ```after```, and ```around``` parameters are mutually exclusive, only one may be passed at a time.

## Delete/Close Channel

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

## Get Channel Messages

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages

## Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| around? | snowflake | Get messages around this message ID | absent |
| before? | snowflake | Get messages before this message ID | absent |
| after? | snowflake | Get messages after this message ID | absent |
| limit? | integer | Max number of messages to return (1-100) | 50 |

Get Channel Message[

](#get-channel-message)
---------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Retrieves a specific message in the channel. Returns a [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) object on success.

If operating on a guild channel, this endpoint requires the current user to have the ```VIEW_CHANNEL``` and ```READ_MESSAGE_HISTORY``` permissions. If the channel is a voice channel, they must also have the ```CONNECT``` permission.

Create Message[

](#create-message)
-----------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages

Discord may strip certain characters from message content, like invalid unicode characters or characters which cause unexpected message formatting. If you are passing user-generated strings into message content, consider sanitizing the data to prevent unexpected behavior and using ```allowed_mentions``` to prevent unexpected mentions.

Post a message to a guild text or DM channel. Returns a [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) object. Fires a [Message Create](https://ptb.discord.com/developers/docs/topics/gateway-events#message-create) Gateway event. See [message formatting](https://ptb.discord.com/developers/docs/reference#message-formatting) for more information on how to properly format messages.

To create a message as a reply to another message, apps can include a [```message_reference```](https://ptb.discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure) with a ```message_id```. The ```channel_id``` and ```guild_id``` in the ```message_reference``` are optional, but will be validated if provided.

Files must be attached using a ```multipart/form-data``` body as described in [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files).

## Get Channel Message

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## Create Message

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages

## Limitations

*   When operating on a guild channel, the current user must have the ```SEND_MESSAGES``` permission.
*   When sending a message with ```tts``` (text-to-speech) set to ```true```, the current user must have the ```SEND_TTS_MESSAGES``` permission.
*   When creating a message as a reply to another message, the current user must have the ```READ_MESSAGE_HISTORY``` permission.
    *   The referenced message must exist and cannot be a system message.
*   The maximum request size when sending a message is 8MiB
*   For the embed object, you can set every field except ```type``` (it will be ```rich``` regardless of if you try to set it), ```provider```, ```video```, and any ```height```, ```width```, or ```proxy_url``` values for images.

## JSON/Form Params

When creating a message, apps must provide a value for at least one of ```content```, ```embeds```, ```sticker_ids```, ```components```, or ```files[n]```.

| Field | Type | Description |
| --- | --- | --- |
| content?\* | string | Message contents (up to 2000 characters) |
| nonce? | integer or string | Can be used to verify a message was sent (up to 25 characters). Value will appear in the [Message Create event](https://ptb.discord.com/developers/docs/topics/gateway-events#message-create). |
| tts? | boolean | ```true``` if this is a TTS message |
| embeds?\* | array of [embed](https://ptb.discord.com/developers/docs/resources/channel#embed-object) objects | Up to 10 ```rich``` embeds (up to 6000 characters) |
| allowed\_mentions? | [allowed mention object](https://ptb.discord.com/developers/docs/resources/channel#allowed-mentions-object) | Allowed mentions for the message |
| message\_reference? | [message reference](https://ptb.discord.com/developers/docs/resources/channel#message-reference-object-message-reference-structure) | Include to make your message a reply |
| components?\* | array of [message component](https://ptb.discord.com/developers/docs/interactions/message-components#component-object) objects | Components to include with the message |
| sticker\_ids?\* | array of snowflakes | IDs of up to 3 [stickers](https://ptb.discord.com/developers/docs/resources/sticker#sticker-object) in the server to send in the message |
| files\[n\]?\* | file contents | Contents of the file being sent. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| payload\_json? | string | JSON-encoded body of non-file params, only for ```multipart/form-data``` requests. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| attachments? | array of partial [attachment](https://ptb.discord.com/developers/docs/resources/channel#attachment-object) objects | Attachment objects with filename and description. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| flags? | integer | [Message flags](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only ```SUPPRESS_EMBEDS``` and ```SUPPRESS_NOTIFICATIONS``` can be set) |

\* At least one of ```content```, ```embeds```, ```sticker_ids```, ```components```, or ```files[n]``` is required.

## Example Request Body (application/json)

```
{
  "content": "Hello, World!",
  "tts": false,
  "embeds": [{
    "title": "Hello, Embed!",
    "description": "This is an embedded message."
  }]
}
```

Examples for file uploads are available in [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files).

Crosspost Message[

](#crosspost-message)
-----------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/crosspost

Crosspost a message in an Announcement Channel to following channels. This endpoint requires the ```SEND_MESSAGES``` permission, if the current user sent the message, or additionally the ```MANAGE_MESSAGES``` permission, for all other messages, to be present for the current user.

Returns a [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) object. Fires a [Message Update](https://ptb.discord.com/developers/docs/topics/gateway-events#message-update) Gateway event.

Create Reaction[

](#create-reaction)
-------------------------------------

PUT/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)/@me

Create a reaction for the message. This endpoint requires the ```READ_MESSAGE_HISTORY``` permission to be present on the current user. Additionally, if nobody else has reacted to the message using this emoji, this endpoint requires the ```ADD_REACTIONS``` permission to be present on the current user. Returns a 204 empty response on success. Fires a [Message Reaction Add](https://ptb.discord.com/developers/docs/topics/gateway-events#message-reaction-add) Gateway event. The ```emoji``` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with ```10014: Unknown Emoji```. To use custom emoji, you must encode it in the format ```name:id``` with the emoji name and emoji id.

Delete Own Reaction[

](#delete-own-reaction)
---------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)/@me

Delete a reaction the current user has made for the message. Returns a 204 empty response on success. Fires a [Message Reaction Remove](https://ptb.discord.com/developers/docs/topics/gateway-events#message-reaction-remove) Gateway event. The ```emoji``` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with ```10014: Unknown Emoji```. To use custom emoji, you must encode it in the format ```name:id``` with the emoji name and emoji id.

Delete User Reaction[

](#delete-user-reaction)
-----------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

Deletes another user's reaction. This endpoint requires the ```MANAGE_MESSAGES``` permission to be present on the current user. Returns a 204 empty response on success. Fires a [Message Reaction Remove](https://ptb.discord.com/developers/docs/topics/gateway-events#message-reaction-remove) Gateway event. The ```emoji``` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with ```10014: Unknown Emoji```. To use custom emoji, you must encode it in the format ```name:id``` with the emoji name and emoji id.

Get Reactions[

](#get-reactions)
---------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

Get a list of users that reacted with this emoji. Returns an array of [user](https://ptb.discord.com/developers/docs/resources/user#user-object) objects on success. The ```emoji``` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with ```10014: Unknown Emoji```. To use custom emoji, you must encode it in the format ```name:id``` with the emoji name and emoji id.

## Crosspost Message

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/crosspost

## Create Reaction

PUT

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)/@me

## Delete Own Reaction

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)/@me

## Delete User Reaction

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

## Get Reactions

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

## Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| after? | snowflake | Get users after this user ID | absent |
| limit? | integer | Max number of users to return (1-100) | 25 |

Delete All Reactions[

](#delete-all-reactions)
-----------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions

Deletes all reactions on a message. This endpoint requires the ```MANAGE_MESSAGES``` permission to be present on the current user. Fires a [Message Reaction Remove All](https://ptb.discord.com/developers/docs/topics/gateway-events#message-reaction-remove-all) Gateway event.

Delete All Reactions for Emoji[

](#delete-all-reactions-for-emoji)
-------------------------------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

Deletes all the reactions for a given emoji on a message. This endpoint requires the ```MANAGE_MESSAGES``` permission to be present on the current user. Fires a [Message Reaction Remove Emoji](https://ptb.discord.com/developers/docs/topics/gateway-events#message-reaction-remove-emoji) Gateway event. The ```emoji``` must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with ```10014: Unknown Emoji```. To use custom emoji, you must encode it in the format ```name:id``` with the emoji name and emoji id.

Edit Message[

](#edit-message)
-------------------------------

PATCH/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Edit a previously sent message. The fields ```content```, ```embeds```, and ```flags``` can be edited by the original message author. Other users can only edit ```flags``` and only if they have the ```MANAGE_MESSAGES``` permission in the corresponding channel. When specifying flags, ensure to include all previously set flags/bits in addition to ones that you are modifying. Only ```flags``` documented in the table below may be modified by users (unsupported flag changes are currently ignored without error).

When the ```content``` field is edited, the ```mentions``` array in the message object will be reconstructed from scratch based on the new content. The ```allowed_mentions``` field of the edit request controls how this happens. If there is no explicit ```allowed_mentions``` in the edit request, the content will be parsed with default allowances, that is, without regard to whether or not an ```allowed_mentions``` was present in the request that originally created the message.

Returns a [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) object. Fires a [Message Update](https://ptb.discord.com/developers/docs/topics/gateway-events#message-update) Gateway event.

Refer to [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) for details on attachments and ```multipart/form-data``` requests. Any provided files will be appended to the message. To remove or replace files you will have to supply the ```attachments``` field which specifies the files to retain on the message after edit.

Starting with API v10, the ```attachments``` array must contain all attachments that should be present after edit, including retained and new attachments provided in the request body.

All parameters to this endpoint are optional and nullable.

## Delete All Reactions

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions

## Delete All Reactions for Emoji

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/reactions/[{emoji}](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object)

## Edit Message

PATCH

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## JSON/Form Params

| Field | Type | Description |
| --- | --- | --- |
| content | string | Message contents (up to 2000 characters) |
| embeds | array of [embed](https://ptb.discord.com/developers/docs/resources/channel#embed-object) objects | Up to 10 ```rich``` embeds (up to 6000 characters) |
| flags | integer | Edit the [flags](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-flags) of a message (only ```SUPPRESS_EMBEDS``` can currently be set/unset) |
| allowed\_mentions | [allowed mention object](https://ptb.discord.com/developers/docs/resources/channel#allowed-mentions-object) | Allowed mentions for the message |
| components | array of [message component](https://ptb.discord.com/developers/docs/interactions/message-components#component-object) | Components to include with the message |
| files\[n\] | file contents | Contents of the file being sent/edited. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| payload\_json | string | JSON-encoded body of non-file params (multipart/form-data only). See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| attachments | array of [attachment](https://ptb.discord.com/developers/docs/resources/channel#attachment-object) objects | Attached files to keep and possible descriptions for new files. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |

Delete Message[

](#delete-message)
-----------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Delete a message. If operating on a guild channel and trying to delete a message that was not sent by the current user, this endpoint requires the ```MANAGE_MESSAGES``` permission. Returns a 204 empty response on success. Fires a [Message Delete](https://ptb.discord.com/developers/docs/topics/gateway-events#message-delete) Gateway event.

This endpoint supports the ```X-Audit-Log-Reason``` header.

Bulk Delete Messages[

](#bulk-delete-messages)
-----------------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/bulk-delete

Delete multiple messages in a single request. This endpoint can only be used on guild channels and requires the ```MANAGE_MESSAGES``` permission. Returns a 204 empty response on success. Fires a [Message Delete Bulk](https://ptb.discord.com/developers/docs/topics/gateway-events#message-delete-bulk) Gateway event.

Any message IDs given that do not exist or are invalid will count towards the minimum and maximum message count (currently 2 and 100 respectively).

This endpoint will not delete messages older than 2 weeks, and will fail with a 400 BAD REQUEST if any message provided is older than that or if any duplicate message IDs are provided.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Delete Message

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## Bulk Delete Messages

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/bulk-delete

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| messages | array of snowflakes | an array of message ids to delete (2-100) |

Edit Channel Permissions[

](#edit-channel-permissions)
-------------------------------------------------------

PUT/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/permissions/[{overwrite.id}](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object)

Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires the ```MANAGE_ROLES``` permission. Only permissions your bot has in the guild or parent channel (if applicable) can be allowed/denied (unless your bot has a ```MANAGE_ROLES``` overwrite in the channel). Returns a 204 empty response on success. Fires a [Channel Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-update) Gateway event. For more information about permissions, see [permissions](https://ptb.discord.com/developers/docs/topics/permissions#permissions).

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Edit Channel Permissions

PUT

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/permissions/[{overwrite.id}](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| allow? | string? | the bitwise value of all allowed permissions (default ```"0"```) |
| deny? | string? | the bitwise value of all disallowed permissions (default ```"0"```) |
| type | integer | 0 for a role or 1 for a member |

Get Channel Invites[

](#get-channel-invites)
---------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/invites

Returns a list of [invite](https://ptb.discord.com/developers/docs/resources/invite#invite-object) objects (with [invite metadata](https://ptb.discord.com/developers/docs/resources/invite#invite-metadata-object)) for the channel. Only usable for guild channels. Requires the ```MANAGE_CHANNELS``` permission.

Create Channel Invite[

](#create-channel-invite)
-------------------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/invites

Create a new [invite](https://ptb.discord.com/developers/docs/resources/invite#invite-object) object for the channel. Only usable for guild channels. Requires the ```CREATE_INSTANT_INVITE``` permission. All JSON parameters for this route are optional, however the request body is not. If you are not sending any fields, you still have to send an empty JSON object (```{}```). Returns an [invite](https://ptb.discord.com/developers/docs/resources/invite#invite-object) object. Fires an [Invite Create](https://ptb.discord.com/developers/docs/topics/gateway-events#invite-create) Gateway event.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Get Channel Invites

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/invites

## Create Channel Invite

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/invites

## JSON Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| max\_age | integer | duration of invite in seconds before expiry, or 0 for never. between 0 and 604800 (7 days) | 86400 (24 hours) |
| max\_uses | integer | max number of uses or 0 for unlimited. between 0 and 100 | 0 |
| temporary | boolean | whether this invite only grants temporary membership | false |
| unique | boolean | if true, don't try to reuse a similar invite (useful for creating many unique one time use invites) | false |
| target\_type | integer | the [type of target](https://ptb.discord.com/developers/docs/resources/invite#invite-object-invite-target-types) for this voice channel invite |  |
| target\_user\_id | snowflake | the id of the user whose stream to display for this invite, required if ```target_type``` is 1, the user must be streaming in the channel |  |
| target\_application\_id | snowflake | the id of the embedded application to open for this invite, required if ```target_type``` is 2, the application must have the ```EMBEDDED``` flag |  |

Delete Channel Permission[

](#delete-channel-permission)
---------------------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/permissions/[{overwrite.id}](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object)

Delete a channel permission overwrite for a user or role in a channel. Only usable for guild channels. Requires the ```MANAGE_ROLES``` permission. Returns a 204 empty response on success. Fires a [Channel Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-update) Gateway event. For more information about permissions, see [permissions](https://ptb.discord.com/developers/docs/topics/permissions#permissions)

This endpoint supports the ```X-Audit-Log-Reason``` header.

Follow Announcement Channel[

](#follow-announcement-channel)
-------------------------------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/followers

Follow an Announcement Channel to send messages to a target channel. Requires the ```MANAGE_WEBHOOKS``` permission in the target channel. Returns a [followed channel](https://ptb.discord.com/developers/docs/resources/channel#followed-channel-object) object. Fires a [Webhooks Update](https://ptb.discord.com/developers/docs/topics/gateway-events#webhooks-update) Gateway event for the target channel.

## Delete Channel Permission

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/permissions/[{overwrite.id}](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object)

## Follow Announcement Channel

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/followers

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| webhook\_channel\_id | snowflake | id of target channel |

Trigger Typing Indicator[

](#trigger-typing-indicator)
-------------------------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/typing

Post a typing indicator for the specified channel. Generally bots should not implement this route. However, if a bot is responding to a command and expects the computation to take a few seconds, this endpoint may be called to let the user know that the bot is processing their message. Returns a 204 empty response on success. Fires a [Typing Start](https://ptb.discord.com/developers/docs/topics/gateway-events#typing-start) Gateway event.

Get Pinned Messages[

](#get-pinned-messages)
---------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/pins

Returns all pinned messages in the channel as an array of [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) objects.

Pin Message[

](#pin-message)
-----------------------------

PUT/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/pins/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Pin a message in a channel. Requires the ```MANAGE_MESSAGES``` permission. Returns a 204 empty response on success. Fires a [Channel Pins Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-pins-update) Gateway event.

The max pinned messages is 50.

This endpoint supports the ```X-Audit-Log-Reason``` header.

Unpin Message[

](#unpin-message)
---------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/pins/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

Unpin a message in a channel. Requires the ```MANAGE_MESSAGES``` permission. Returns a 204 empty response on success. Fires a [Channel Pins Update](https://ptb.discord.com/developers/docs/topics/gateway-events#channel-pins-update) Gateway event.

This endpoint supports the ```X-Audit-Log-Reason``` header.

Group DM Add Recipient[

](#group-dm-add-recipient)
---------------------------------------------------

PUT/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/recipients/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

Adds a recipient to a Group DM using their access token.

## Trigger Typing Indicator

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/typing

## Get Pinned Messages

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/pins

## Pin Message

PUT

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/pins/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## Unpin Message

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/pins/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)

## Group DM Add Recipient

PUT

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/recipients/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| access\_token | string | access token of a user that has granted your app the ```gdm.join``` scope |
| nick | string | nickname of the user being added |

Group DM Remove Recipient[

](#group-dm-remove-recipient)
---------------------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/recipients/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

Removes a recipient from a Group DM.

Start Thread from Message[

](#start-thread-from-message)
---------------------------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/threads

Creates a new thread from an existing message. Returns a [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-create) and a [Message Update](https://ptb.discord.com/developers/docs/topics/gateway-events#message-update) Gateway event.

When called on a ```GUILD_TEXT``` channel, creates a ```PUBLIC_THREAD```. When called on a ```GUILD_ANNOUNCEMENT``` channel, creates a ```ANNOUNCEMENT_THREAD```. Does not work on a [```GUILD_FORUM```](https://ptb.discord.com/developers/docs/resources/channel#start-thread-in-forum-channel) channel. The id of the created thread will be the same as the id of the source message, and as such a message can only have a single thread created from it.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Group DM Remove Recipient

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/recipients/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

## Start Thread from Message

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/messages/[{message.id}](https://ptb.discord.com/developers/docs/resources/channel#message-object)/threads

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| auto\_archive\_duration? | integer | the thread will stop showing in the channel list after ```auto_archive_duration``` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 |
| rate\_limit\_per\_user? | ?integer | amount of seconds a user has to wait before sending another message (0-21600) |

Start Thread without Message[

](#start-thread-without-message)
---------------------------------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads

Creates a new thread that is not connected to an existing message. Returns a [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-create) Gateway event.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Start Thread without Message

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| auto\_archive\_duration? | integer | the thread will stop showing in the channel list after ```auto_archive_duration``` minutes of inactivity, can be set to: 60, 1440, 4320, 10080 |
| type?\* | integer | the [type of thread](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types) to create |
| invitable? | boolean | whether non-moderators can add other non-moderators to a thread; only available when creating a private thread |
| rate\_limit\_per\_user? | ?integer | amount of seconds a user has to wait before sending another message (0-21600) |

\* ```type``` currently defaults to ```PRIVATE_THREAD``` in order to match the behavior when thread documentation was first published. In a future API version this will be changed to be a required field, with no default.

Start Thread in Forum Channel[

](#start-thread-in-forum-channel)
-----------------------------------------------------------------

POST/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads

Creates a new thread in a forum channel, and sends a message within the created thread. Returns a [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object), with a nested [message](https://ptb.discord.com/developers/docs/resources/channel#message-object) object, on success, and a 400 BAD REQUEST on invalid parameters. Fires a [Thread Create](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-create) and [Message Create](https://ptb.discord.com/developers/docs/topics/gateway-events#message-create) Gateway event.

*   The type of the created thread is ```PUBLIC_THREAD```.
*   See [message formatting](https://ptb.discord.com/developers/docs/reference#message-formatting) for more information on how to properly format messages.
*   The current user must have the ```SEND_MESSAGES``` permission (```CREATE_PUBLIC_THREADS``` is ignored).
*   The maximum request size when sending a message is 8MiB.
*   For the embed object, you can set every field except ```type``` (it will be ```rich``` regardless of if you try to set it), ```provider```, ```video```, and any ```height```, ```width```, or ```proxy_url``` values for images.
*   Examples for file uploads are available in [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files).
*   Files must be attached using a ```multipart/form-data``` body as described in [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files).
*   Note that when sending a message, you must provide a value for at least one of ```content```, ```embeds```, ```sticker_ids```, ```components```, or ```files[n]```.

Discord may strip certain characters from message content, like invalid unicode characters or characters which cause unexpected message formatting. If you are passing user-generated strings into message content, consider sanitizing the data to prevent unexpected behavior and using ```allowed_mentions``` to prevent unexpected mentions.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Start Thread in Forum Channel

POST

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads

## JSON/Form Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | 1-100 character channel name |
| auto\_archive\_duration?\* | integer | duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 |
| rate\_limit\_per\_user? | ?integer | amount of seconds a user has to wait before sending another message (0-21600) |
| message | a [forum thread message params](https://ptb.discord.com/developers/docs/resources/channel#start-thread-in-forum-channel-forum-thread-message-params-object) object | contents of the first message in the forum thread |
| applied\_tags? | array of snowflakes | the IDs of the set of tags that have been applied to a thread in a ```GUILD_FORUM``` channel |

## Forum Thread Message Params Object

When sending a message, apps must provide a value for at least one of ```content```, ```embeds```, ```sticker_ids```, ```components```, or ```files[n]```.

| Field | Type | Description |
| --- | --- | --- |
| content?\* | string | Message contents (up to 2000 characters) |
| embeds?\* | array of [embed](https://ptb.discord.com/developers/docs/resources/channel#embed-object) objects | Up to 10 ```rich``` embeds (up to 6000 characters) |
| allowed\_mentions? | [allowed mention object](https://ptb.discord.com/developers/docs/resources/channel#allowed-mentions-object) | Allowed mentions for the message |
| components?\* | array of [message component](https://ptb.discord.com/developers/docs/interactions/message-components#component-object) objects | Components to include with the message |
| sticker\_ids?\* | array of snowflakes | IDs of up to 3 [stickers](https://ptb.discord.com/developers/docs/resources/sticker#sticker-object) in the server to send in the message |
| files\[n\]\* | file contents | Contents of the file being sent. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| payload\_json? | string | JSON-encoded body of non-file params, only for ```multipart/form-data``` requests. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| attachments? | array of partial [attachment](https://ptb.discord.com/developers/docs/resources/channel#attachment-object) objects | Attachment objects with ```filename``` and ```description```. See [Uploading Files](https://ptb.discord.com/developers/docs/reference#uploading-files) |
| flags? | integer | [Message flags](https://ptb.discord.com/developers/docs/resources/channel#message-object-message-flags) combined as a [bitfield](https://en.wikipedia.org/wiki/Bit_field) (only ```SUPPRESS_EMBEDS``` and ```SUPPRESS_NOTIFICATIONS``` can be set) |

\* At least one of ```content```, ```embeds```, ```sticker_ids```, ```components```, or ```files[n]``` is required.

Join Thread[

](#join-thread)
-----------------------------

PUT/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/@me

Adds the current user to a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-members-update) and a [Thread Create](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-create) Gateway event.

Add Thread Member[

](#add-thread-member)
-----------------------------------------

PUT/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

Adds another member to a thread. Requires the ability to send messages in the thread. Also requires the thread is not archived. Returns a 204 empty response if the member is successfully added or was already a member of the thread. Fires a [Thread Members Update](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-members-update) Gateway event.

Leave Thread[

](#leave-thread)
-------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/@me

Removes the current user from a thread. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-members-update) Gateway event.

Remove Thread Member[

](#remove-thread-member)
-----------------------------------------------

DELETE/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

Removes another member from a thread. Requires the ```MANAGE_THREADS``` permission, or the creator of the thread if it is a ```PRIVATE_THREAD```. Also requires the thread is not archived. Returns a 204 empty response on success. Fires a [Thread Members Update](https://ptb.discord.com/developers/docs/topics/gateway-events#thread-members-update) Gateway event.

Get Thread Member[

](#get-thread-member)
-----------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

Returns a [thread member](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) object for the specified user if they are a member of the thread, returns a 404 response otherwise.

When ```with_member``` is set to ```true```, the thread member object will include a ```member``` field containing a [guild member](https://ptb.discord.com/developers/docs/resources/guild#guild-member-object) object.

## Join Thread

PUT

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/@me

## Add Thread Member

PUT

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

## Leave Thread

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/@me

## Remove Thread Member

DELETE

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

## Get Thread Member

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members/[{user.id}](https://ptb.discord.com/developers/docs/resources/user#user-object)

## Query String Params

| Field | Type | Description |
| --- | --- | --- |
| with\_member? | boolean | Whether to include a [guild member](https://ptb.discord.com/developers/docs/resources/guild#guild-member-object) object for the thread member |

List Thread Members[

](#list-thread-members)
---------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members

Starting in API v11, this endpoint will always return paginated results. Paginated results can be enabled before API v11 by setting ```with_member``` to ```true```. Read [the changelog](https://ptb.discord.com/developers/docs/change-log#thread-member-details-and-pagination) for details.

Returns array of [thread members](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) objects that are members of the thread.

When ```with_member``` is set to ```true```, the results will be paginated and each thread member object will include a ```member``` field containing a [guild member](https://ptb.discord.com/developers/docs/resources/guild#guild-member-object) object.

This endpoint is restricted according to whether the ```GUILD_MEMBERS``` [Privileged Intent](https://ptb.discord.com/developers/docs/topics/gateway#privileged-intents) is enabled for your application.

## List Thread Members

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/thread-members

## Query String Params

| Field | Type | Description |
| --- | --- | --- |
| with\_member? | boolean | Whether to include a [guild member](https://ptb.discord.com/developers/docs/resources/guild#guild-member-object) object for each thread member |
| after? | snowflake | Get thread members after this user ID |
| limit? | integer | Max number of thread members to return (1-100). Defaults to 100. |

List Public Archived Threads[

](#list-public-archived-threads)
---------------------------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads/archived/public

Returns archived threads in the channel that are public. When called on a ```GUILD_TEXT``` channel, returns threads of [type](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types) ```PUBLIC_THREAD```. When called on a ```GUILD_ANNOUNCEMENT``` channel returns threads of [type](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types) ```ANNOUNCEMENT_THREAD```. Threads are ordered by ```archive_timestamp```, in descending order. Requires the ```READ_MESSAGE_HISTORY``` permission.

## List Public Archived Threads

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads/archived/public

## Query String Params

| Field | Type | Description |
| --- | --- | --- |
| before? | ISO8601 timestamp | returns threads before this timestamp |
| limit? | integer | optional maximum number of threads to return |

## Response Body

| Field | Type | Description |
| --- | --- | --- |
| threads | array of [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) objects | the public, archived threads |
| members | array of [thread members](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) objects | a thread member object for each returned thread the current user has joined |
| has\_more | boolean | whether there are potentially additional threads that could be returned on a subsequent call |

List Private Archived Threads[

](#list-private-archived-threads)
-----------------------------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads/archived/private

Returns archived threads in the channel that are of [type](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types) ```PRIVATE_THREAD```. Threads are ordered by ```archive_timestamp```, in descending order. Requires both the ```READ_MESSAGE_HISTORY``` and ```MANAGE_THREADS``` permissions.

## List Private Archived Threads

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/threads/archived/private

## Query String Params

| Field | Type | Description |
| --- | --- | --- |
| before? | ISO8601 timestamp | returns threads before this timestamp |
| limit? | integer | optional maximum number of threads to return |

## Response Body

| Field | Type | Description |
| --- | --- | --- |
| threads | array of [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) objects | the private, archived threads |
| members | array of [thread members](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) objects | a thread member object for each returned thread the current user has joined |
| has\_more | boolean | whether there are potentially additional threads that could be returned on a subsequent call |

List Joined Private Archived Threads[

](#list-joined-private-archived-threads)
-------------------------------------------------------------------------------

GET/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/users/@me/threads/archived/private

Returns archived threads in the channel that are of [type](https://ptb.discord.com/developers/docs/resources/channel#channel-object-channel-types) ```PRIVATE_THREAD```, and the user has joined. Threads are ordered by their ```id```, in descending order. Requires the ```READ_MESSAGE_HISTORY``` permission.

## List Joined Private Archived Threads

GET

/channels/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)/users/@me/threads/archived/private

## Query String Params

| Field | Type | Description |
| --- | --- | --- |
| before? | snowflake | returns threads before this id |
| limit? | integer | optional maximum number of threads to return |

## Response Body

| Field | Type | Description |
| --- | --- | --- |
| threads | array of [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) objects | the private, archived threads the current user has joined |
| members | array of [thread members](https://ptb.discord.com/developers/docs/resources/channel#thread-member-object) objects | a thread member object for each returned thread the current user has joined |
| has\_more | boolean | whether there are potentially additional threads that could be returned on a subsequent call |

