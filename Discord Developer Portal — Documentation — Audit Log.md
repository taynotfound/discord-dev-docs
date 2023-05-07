# Discord Developer Portal — Documentation — Audit Log

## Audit Logs Resource

## Audit Logs

When an administrative action is performed in a guild, an entry is added to its audit log. Viewing audit logs requires the ```VIEW_AUDIT_LOG``` permission and can be fetched by apps using the [```GET /guilds/{guild.id}/audit-logs``` endpoint](https://ptb.discord.com/developers/docs/resources/audit-log#get-guild-audit-log), or seen by users in the guild's Server Settings. All audit log entries are stored for 45 days.

When an app is performing an eligible action using the APIs, it can pass an ```X-Audit-Log-Reason``` header to indicate why the action was taken. More information is in the [audit log entry](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object) section.

## Audit Log Object

## Audit Log Structure

| Field | Type | Description |
| --- | --- | --- |
| application\_commands | array of [application commands](https://ptb.discord.com/developers/docs/interactions/application-commands#application-command-object) objects | List of application commands referenced in the audit log |
| audit\_log\_entries | array of [audit log entry](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object) objects | List of audit log entries, sorted from most to least recent |
| auto\_moderation\_rules | array of [auto moderation rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) objects | List of auto moderation rules referenced in the audit log |
| guild\_scheduled\_events | array of [guild scheduled event](https://ptb.discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object) objects | List of guild scheduled events referenced in the audit log |
| integrations | array of partial [integration](https://ptb.discord.com/developers/docs/resources/guild#integration-object) objects | List of partial integration objects |
| threads | array of thread-specific [channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) objects | List of threads referenced in the audit log\* |
| users | array of [user](https://ptb.discord.com/developers/docs/resources/user#user-object) objects | List of users referenced in the audit log |
| webhooks | array of [webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object) objects | List of webhooks referenced in the audit log |

\* Threads referenced in ```THREAD_CREATE``` and ```THREAD_UPDATE``` events are included in the threads map since archived threads might not be kept in memory by clients.

## Example Partial Integration Object

```
{
  "id": "33590653072239123",
  "name": "A Name",
  "type": "twitch",
  "account": {
    "name": "twitchusername",
    "id": "1234567"
  },
  "application_id": "94651234501213162"
}
```

## Audit Log Entry Object

Each audit log entry represents a single administrative action (or [event](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events)), indicated by ```action_type```. Most entries contain one to many changes in the ```changes``` array that affected an entity in Discord—whether that's a user, channel, guild, emoji, or something else.

The information (and structure) of an entry's changes will be different depending on its type. For example, in ```MEMBER_ROLE_UPDATE``` events there is only one change: a member is either added or removed from a specific role. However, in ```CHANNEL_CREATE``` events there are many changes, including (but not limited to) the channel's name, type, and permission overwrites added. More details are in the [change object](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-change-object) section.

Apps can specify why an administrative action is being taken by passing an ```X-Audit-Log-Reason``` request header, which will be stored as the audit log entry's ```reason``` field. The ```X-Audit-Log-Reason``` header supports 1-512 URL-encoded UTF-8 characters. Reasons are visible to users in the client and to apps when fetching audit log entries with the API.

## Audit Log Entry Structure

| Field | Type | Description |
| --- | --- | --- |
| target\_id | ?string | ID of the affected entity (webhook, user, role, etc.) |
| changes? | array of [audit log change](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-change-object) objects | Changes made to the target\_id |
| user\_id | ?snowflake | User or app that made the changes |
| id | snowflake | ID of the entry |
| action\_type | [audit log event](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) | Type of action that occurred |
| options? | [optional audit entry info](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info) | Additional info for certain event types |
| reason? | string | Reason for the change (1-512 characters) |

For ```APPLICATION_COMMAND_PERMISSION_UPDATE``` events, the ```target_id``` is the command ID or the app ID since the ```changes``` array represents the entire ```permissions``` property on the [guild permissions](https://ptb.discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-guild-application-command-permissions-structure) object.

## Audit Log Events

The table below lists audit log events and values (the ```action_type``` field) that your app may receive.

The Object Changed column notes which object's values may be included in the entry. Though there are exceptions, possible keys in the ```changes``` array typically correspond to the object's fields. The descriptions and types for those fields can be found in the linked documentation for the object.

If no object is noted, there won't be a ```changes``` array in the entry, though other fields like the ```target_id``` still exist and many have fields in the [```options``` array](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info).

You should assume that your app may run into any field for the changed object, though none are guaranteed to be present. In most cases only a subset of the object's fields will be in the ```changes``` array.

| Event | Value | Description | Object Changed |
| --- | --- | --- | --- |
| GUILD\_UPDATE | 1 | Server settings were updated | [Guild](https://ptb.discord.com/developers/docs/resources/guild#guild-object) |
| CHANNEL\_CREATE | 10 | Channel was created | [Channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) |
| CHANNEL\_UPDATE | 11 | Channel settings were updated | [Channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) |
| CHANNEL\_DELETE | 12 | Channel was deleted | [Channel](https://ptb.discord.com/developers/docs/resources/channel#channel-object) |
| CHANNEL\_OVERWRITE\_CREATE | 13 | Permission overwrite was added to a channel | [Channel Overwrite](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object) |
| CHANNEL\_OVERWRITE\_UPDATE | 14 | Permission overwrite was updated for a channel | [Channel Overwrite](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object) |
| CHANNEL\_OVERWRITE\_DELETE | 15 | Permission overwrite was deleted from a channel | [Channel Overwrite](https://ptb.discord.com/developers/docs/resources/channel#overwrite-object) |
| MEMBER\_KICK | 20 | Member was removed from server |  |
| MEMBER\_PRUNE | 21 | Members were pruned from server |  |
| MEMBER\_BAN\_ADD | 22 | Member was banned from server |  |
| MEMBER\_BAN\_REMOVE | 23 | Server ban was lifted for a member |  |
| MEMBER\_UPDATE | 24 | Member was updated in server | [Member](https://ptb.discord.com/developers/docs/resources/guild#guild-member-object) |
| MEMBER\_ROLE\_UPDATE | 25 | Member was added or removed from a role | [Partial Role](https://ptb.discord.com/developers/docs/topics/permissions#role-object)\* |
| MEMBER\_MOVE | 26 | Member was moved to a different voice channel |  |
| MEMBER\_DISCONNECT | 27 | Member was disconnected from a voice channel |  |
| BOT\_ADD | 28 | Bot user was added to server |  |
| ROLE\_CREATE | 30 | Role was created | [Role](https://ptb.discord.com/developers/docs/topics/permissions#role-object) |
| ROLE\_UPDATE | 31 | Role was edited | [Role](https://ptb.discord.com/developers/docs/topics/permissions#role-object) |
| ROLE\_DELETE | 32 | Role was deleted | [Role](https://ptb.discord.com/developers/docs/topics/permissions#role-object) |
| INVITE\_CREATE | 40 | Server invite was created | [Invite](https://ptb.discord.com/developers/docs/resources/invite#invite-object) and [Invite Metadata](https://ptb.discord.com/developers/docs/resources/invite#invite-metadata-object)\* |
| INVITE\_UPDATE | 41 | Server invite was updated | [Invite](https://ptb.discord.com/developers/docs/resources/invite#invite-object) and [Invite Metadata](https://ptb.discord.com/developers/docs/resources/invite#invite-metadata-object)\* |
| INVITE\_DELETE | 42 | Server invite was deleted | [Invite](https://ptb.discord.com/developers/docs/resources/invite#invite-object) and [Invite Metadata](https://ptb.discord.com/developers/docs/resources/invite#invite-metadata-object)\* |
| WEBHOOK\_CREATE | 50 | Webhook was created | [Webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)\* |
| WEBHOOK\_UPDATE | 51 | Webhook properties or channel were updated | [Webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)\* |
| WEBHOOK\_DELETE | 52 | Webhook was deleted | [Webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object)\* |
| EMOJI\_CREATE | 60 | Emoji was created | [Emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) |
| EMOJI\_UPDATE | 61 | Emoji name was updated | [Emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) |
| EMOJI\_DELETE | 62 | Emoji was deleted | [Emoji](https://ptb.discord.com/developers/docs/resources/emoji#emoji-object) |
| MESSAGE\_DELETE | 72 | Single message was deleted |  |
| MESSAGE\_BULK\_DELETE | 73 | Multiple messages were deleted |  |
| MESSAGE\_PIN | 74 | Message was pinned to a channel |  |
| MESSAGE\_UNPIN | 75 | Message was unpinned from a channel |  |
| INTEGRATION\_CREATE | 80 | App was added to server | [Integration](https://ptb.discord.com/developers/docs/resources/guild#integration-object) |
| INTEGRATION\_UPDATE | 81 | App was updated (as an example, its scopes were updated) | [Integration](https://ptb.discord.com/developers/docs/resources/guild#integration-object) |
| INTEGRATION\_DELETE | 82 | App was removed from server | [Integration](https://ptb.discord.com/developers/docs/resources/guild#integration-object) |
| STAGE\_INSTANCE\_CREATE | 83 | Stage instance was created (stage channel becomes live) | [Stage Instance](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object) |
| STAGE\_INSTANCE\_UPDATE | 84 | Stage instance details were updated | [Stage Instance](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object) |
| STAGE\_INSTANCE\_DELETE | 85 | Stage instance was deleted (stage channel no longer live) | [Stage Instance](https://ptb.discord.com/developers/docs/resources/stage-instance#stage-instance-object) |
| STICKER\_CREATE | 90 | Sticker was created | [Sticker](https://ptb.discord.com/developers/docs/resources/sticker#sticker-object) |
| STICKER\_UPDATE | 91 | Sticker details were updated | [Sticker](https://ptb.discord.com/developers/docs/resources/sticker#sticker-object) |
| STICKER\_DELETE | 92 | Sticker was deleted | [Sticker](https://ptb.discord.com/developers/docs/resources/sticker#sticker-object) |
| GUILD\_SCHEDULED\_EVENT\_CREATE | 100 | Event was created | [Guild Scheduled Event](https://ptb.discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object) |
| GUILD\_SCHEDULED\_EVENT\_UPDATE | 101 | Event was updated | [Guild Scheduled Event](https://ptb.discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object) |
| GUILD\_SCHEDULED\_EVENT\_DELETE | 102 | Event was cancelled | [Guild Scheduled Event](https://ptb.discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object) |
| THREAD\_CREATE | 110 | Thread was created in a channel | [Thread](https://ptb.discord.com/developers/docs/resources/channel#thread-metadata-object) |
| THREAD\_UPDATE | 111 | Thread was updated | [Thread](https://ptb.discord.com/developers/docs/resources/channel#thread-metadata-object) |
| THREAD\_DELETE | 112 | Thread was deleted | [Thread](https://ptb.discord.com/developers/docs/resources/channel#thread-metadata-object) |
| APPLICATION\_COMMAND\_PERMISSION\_UPDATE | 121 | Permissions were updated for a command | [Command Permission](https://ptb.discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure)\* |
| AUTO\_MODERATION\_RULE\_CREATE | 140 | Auto Moderation rule was created | [Auto Moderation Rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) |
| AUTO\_MODERATION\_RULE\_UPDATE | 141 | Auto Moderation rule was updated | [Auto Moderation Rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) |
| AUTO\_MODERATION\_RULE\_DELETE | 142 | Auto Moderation rule was deleted | [Auto Moderation Rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) |
| AUTO\_MODERATION\_BLOCK\_MESSAGE | 143 | Message was blocked by Auto Moderation |  |
| AUTO\_MODERATION\_FLAG\_TO\_CHANNEL | 144 | Message was flagged by Auto Moderation |  |
| AUTO\_MODERATION\_USER\_COMMUNICATION\_DISABLED | 145 | Member was timed out by Auto Moderation |  |

\* Object has exception(s) to available keys. See the [exceptions](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-exceptions) section below for details.

## Optional Audit Entry Info

| Field | Type | Description | Event Types |
| --- | --- | --- | --- |
| application\_id | snowflake | ID of the app whose permissions were targeted | APPLICATION\_COMMAND\_PERMISSION\_UPDATE |
| auto\_moderation\_rule\_name | string | Name of the Auto Moderation rule that was triggered | AUTO\_MODERATION\_BLOCK\_MESSAGE & AUTO\_MODERATION\_FLAG\_TO\_CHANNEL & AUTO\_MODERATION\_USER\_COMMUNICATION\_DISABLED |
| auto\_moderation\_rule\_trigger\_type | string | Trigger type of the Auto Moderation rule that was triggered | AUTO\_MODERATION\_BLOCK\_MESSAGE & AUTO\_MODERATION\_FLAG\_TO\_CHANNEL & AUTO\_MODERATION\_USER\_COMMUNICATION\_DISABLED |
| channel\_id | snowflake | Channel in which the entities were targeted | MEMBER\_MOVE & MESSAGE\_PIN & MESSAGE\_UNPIN & MESSAGE\_DELETE & STAGE\_INSTANCE\_CREATE & STAGE\_INSTANCE\_UPDATE & STAGE\_INSTANCE\_DELETE & AUTO\_MODERATION\_BLOCK\_MESSAGE & AUTO\_MODERATION\_FLAG\_TO\_CHANNEL & AUTO\_MODERATION\_USER\_COMMUNICATION\_DISABLED |
| count | string | Number of entities that were targeted | MESSAGE\_DELETE & MESSAGE\_BULK\_DELETE & MEMBER\_DISCONNECT & MEMBER\_MOVE |
| delete\_member\_days | string | Number of days after which inactive members were kicked | MEMBER\_PRUNE |
| id | snowflake | ID of the overwritten entity | CHANNEL\_OVERWRITE\_CREATE & CHANNEL\_OVERWRITE\_UPDATE & CHANNEL\_OVERWRITE\_DELETE |
| members\_removed | string | Number of members removed by the prune | MEMBER\_PRUNE |
| message\_id | snowflake | ID of the message that was targeted | MESSAGE\_PIN & MESSAGE\_UNPIN |
| role\_name | string | Name of the role if type is ```"0"``` (not present if type is ```"1"```) | CHANNEL\_OVERWRITE\_CREATE & CHANNEL\_OVERWRITE\_UPDATE & CHANNEL\_OVERWRITE\_DELETE |
| type | string | Type of overwritten entity - role (```"0"```) or member (```"1"```) | CHANNEL\_OVERWRITE\_CREATE & CHANNEL\_OVERWRITE\_UPDATE & CHANNEL\_OVERWRITE\_DELETE |

## Audit Log Change Object

Many audit log events include a ```changes``` array in their [entry object](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure). The [structure for the individual changes](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-structure) varies based on the event type and its changed objects, so apps shouldn't depend on a single pattern of handling audit log events.

## Audit Log Change Structure

Some events don't follow the same pattern as other audit log events. Details about these exceptions are explained in [the next section](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-exceptions).

If ```new_value``` is not present in the change object while ```old_value``` is, it indicates that the property has been reset or set to ```null```. If ```old_value``` isn't included, it indicated that the property was previously ```null```.

| Field | Type | Description |
| --- | --- | --- |
| new\_value? | mixed (matches object field's type) | New value of the key |
| old\_value? | mixed (matches object field's type) | Old value of the key |
| key | string | Name of the changed entity, with a few [exceptions](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-exceptions) |

## Audit Log Change Exceptions

For most objects, the change keys may be any field on the changed object. The following table details the exceptions to this pattern.

| Object Changed | Change Key Exceptions | Change Object Exceptions |
| --- | --- | --- |
| [Command Permission](https://ptb.discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permissions-structure) | snowflake as key | The ```changes``` array contains objects with a ```key``` field representing the entity whose command was affected (role, channel, or user ID), a previous permissions object (with an ```old_value``` key), and an updated permissions object (with a ```new_value``` key) |
| [Invite](https://ptb.discord.com/developers/docs/resources/invite#invite-object) and [Invite Metadata](https://ptb.discord.com/developers/docs/resources/invite#invite-metadata-object) | Additional ```channel_id``` key (instead of object's ```channel.id```) |  |
| [Partial Role](https://ptb.discord.com/developers/docs/topics/permissions#role-object) | ```$add``` and ```$remove``` as keys | ```new_value``` is an array of objects that contain the role ```id``` and ```name``` |
| [Webhook](https://ptb.discord.com/developers/docs/resources/webhook#webhook-object) | ```avatar_hash``` key (instead of ```avatar```) |  |

Get Guild Audit Log[

](#get-guild-audit-log)
---------------------------------------------

GET/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/audit-logs

Returns an [audit log](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-object) object for the guild. Requires the [```VIEW_AUDIT_LOG```](https://ptb.discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags) permission.

The returned list of audit log entries is ordered based on whether you use ```before``` or ```after```. When using ```before```, the list is ordered by the audit log entry ID descending (newer entries first). If ```after``` is used, the list is reversed and appears in ascending order (older entries first). Omitting both ```before``` and ```after``` defaults to ```before``` the current timestamp and will show the most recent entries in descending order by ID, the opposite can be achieved using ```after=0``` (showing oldest entries).

## Get Guild Audit Log

GET

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/audit-logs

## Query String Params

The following parameters can be used to filter which and how many audit log entries are returned.

| Field | Type | Description |
| --- | --- | --- |
| user\_id? | snowflake | Entries from a specific user ID |
| action\_type? | integer | Entries for a specific [audit log event](https://ptb.discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) |
| before? | snowflake | Entries with ID less than a specific audit log entry ID |
| after? | snowflake | Entries with ID greater than a specific audit log entry ID |
| limit? | integer | Maximum number of entries (between 1-100) to return, defaults to 50 |

