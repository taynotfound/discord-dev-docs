# Discord Developer Portal — Documentation — Stage Instance

## Stage Instance Resource

A Stage Instance holds information about a live stage.

## Stage Instance Object

## Stage Instance Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | The id of this Stage instance |
| guild\_id | snowflake | The guild id of the associated Stage channel |
| channel\_id | snowflake | The id of the associated Stage channel |
| topic | string | The topic of the Stage instance (1-120 characters) |
| privacy\_level | integer | The [privacy level](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of the Stage instance |
| discoverable\_disabled | boolean | Whether or not Stage Discovery is disabled (deprecated) |
| guild\_scheduled\_event\_id | ?snowflake | The id of the scheduled event for this Stage instance |

## Privacy Level

| Level | Value | Description |
| --- | --- | --- |
| PUBLIC | 1 | The Stage instance is visible publicly. (deprecated) |
| GUILD\_ONLY | 2 | The Stage instance is visible to only guild members. |

## Example Stage Instance

```
{
  "id": "840647391636226060",
  "guild_id": "197038439483310086",
  "channel_id": "733488538393510049",
  "topic": "Testing Testing, 123",
  "privacy_level": 1,
  "discoverable_disabled": false,
  "guild_scheduled_event_id": "947656305244532806"
}
```

## Definitions

Below are some definitions related to stages.

*   Liveness: A Stage channel is considered live when there is an associated stage instance. Conversely, a Stage channel is not live when there is no associated stage instance.
*   Speakers: A participant of a Stage channel is a speaker when their [voice state](https://ptb.discord.com/developers/docs/resources/voice#voice-state-object) is not ```suppress```ed, and has no ```request_to_speak_timestamp```.
*   Moderators: A member of the guild is a moderator of a Stage channel if they have all of the following [permissions](https://ptb.discord.com/developers/docs/topics/permissions#permissions):
    *   ```MANAGE_CHANNELS```
    *   ```MUTE_MEMBERS```
    *   ```MOVE_MEMBERS```
*   Topic: This is the blurb that gets shown below the channel's name, among other places.
*   Public: A Stage instance is public when it has a ```privacy_level``` of ```PUBLIC```. While a guild has a public Stage instance:
    *   The guild will be lurkable.
    *   Lurkers may join any Stage channel with a public Stage instance.
    *   Users in the Stage can have the Stage show in their [activities](https://ptb.discord.com/developers/docs/topics/gateway-events#presence).
    *   [Invites](https://ptb.discord.com/developers/docs/resources/invite#invite-object) to the Stage channel will have the ```stage_instance``` field.

## Auto Closing

When a Stage channel has no speakers for a certain period of time (on the order of minutes), the Stage instance will be automatically deleted.

Create Stage Instance[

](#create-stage-instance)
-------------------------------------------------

POST/stage-instances

Creates a new Stage instance associated to a Stage channel. Returns that [Stage instance](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure). Fires a [Stage Instance Create](https://ptb.discord.com/developers/docs/topics/gateway-events#stage-instance-create) Gateway event.

Requires the user to be a moderator of the Stage channel.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Create Stage Instance

POST

/stage-instances

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| channel\_id | snowflake | The id of the Stage channel |
| topic | string | The topic of the Stage instance (1-120 characters) |
| privacy\_level? | integer | The [privacy level](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of the Stage instance (default GUILD\_ONLY) |
| send\_start\_notification? \* | boolean | Notify @everyone that a Stage instance has started |

\* The stage moderator must have the ```MENTION_EVERYONE``` permission for this notification to be sent.

Get Stage Instance[

](#get-stage-instance)
-------------------------------------------

GET/stage-instances/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

Gets the stage instance associated with the Stage channel, if it exists.

Modify Stage Instance[

](#modify-stage-instance)
-------------------------------------------------

PATCH/stage-instances/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

Updates fields of an existing Stage instance. Returns the updated [Stage instance](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object-stage-instance-structure). Fires a [Stage Instance Update](https://ptb.discord.com/developers/docs/topics/gateway-events#stage-instance-update) Gateway event.

Requires the user to be a moderator of the Stage channel.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Get Stage Instance

GET

/stage-instances/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

## Modify Stage Instance

PATCH

/stage-instances/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| topic? | string | The topic of the Stage instance (1-120 characters) |
| privacy\_level? | integer | The [privacy level](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level) of the Stage instance |

Delete Stage Instance[

](#delete-stage-instance)
-------------------------------------------------

DELETE/stage-instances/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

Deletes the Stage instance. Returns ```204 No Content```. Fires a [Stage Instance Delete](https://ptb.discord.com/developers/docs/topics/gateway-events#stage-instance-delete) Gateway event.

Requires the user to be a moderator of the Stage channel.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Delete Stage Instance

DELETE

/stage-instances/[{channel.id}](https://ptb.discord.com/developers/docs/resources/channel#channel-object)

