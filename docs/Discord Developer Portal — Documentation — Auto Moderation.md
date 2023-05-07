# Discord Developer Portal — Documentation — Auto Moderation

## Auto Moderation

Auto Moderation is a feature which allows each [guild](https://ptb.discord.com/developers/docs/resources/guild) to set up rules that trigger based on some criteria. For example, a rule can trigger whenever a message contains a specific keyword.

Rules can be configured to automatically execute actions whenever they trigger. For example, if a user tries to send a message which contains a certain keyword, a rule can trigger and block the message before it is sent.

## Auto Moderation Rule Object

## Auto Moderation Rule Structure

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | the id of this rule |
| guild\_id | snowflake | the id of the guild which this rule belongs to |
| name | string | the rule name |
| creator\_id | snowflake | the user which first created this rule |
| event\_type | integer | the rule [event type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types) |
| trigger\_type | integer | the rule [trigger type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types) |
| trigger\_metadata | object | the rule [trigger metadata](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) |
| actions | array of [action](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object) objects | the actions which will execute when the rule is triggered |
| enabled | boolean | whether the rule is enabled |
| exempt\_roles | array of snowflakes | the role ids that should not be affected by the rule (Maximum of 20) |
| exempt\_channels | array of snowflakes | the channel ids that should not be affected by the rule (Maximum of 50) |

## Example Auto Moderation Rule

```
{
  "id": "969707018069872670",
  "guild_id": "613425648685547541",
  "name": "Keyword Filter 1",
  "creator_id": "423457898095789043",
  "trigger_type": 1,
  "event_type": 1,
  "actions": [
    {
      "type": 1,
      "metadata": { "custom_message": "Please keep financial discussions limited to the #finance channel" }
    },
    {
      "type": 2,
      "metadata": { "channel_id": "123456789123456789" }
    },
    {
      "type": 3,
      "metadata": { "duration_seconds": 60 }
    }
  ],
  "trigger_metadata": {
    "keyword_filter": ["cat*", "*dog", "*ana*", "i like c++"],
    "regex_patterns": ["(b|c)at", "^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$"]
  },
  "enabled": true,
  "exempt_roles": ["323456789123456789", "423456789123456789"],
  "exempt_channels": ["523456789123456789"]
}
```

## Trigger Types

Characterizes the type of content which can trigger the rule.

| Trigger Type | Value | Description | Max per Guild |
| --- | --- | --- | --- |
| KEYWORD | 1 | check if content contains words from a user defined list of keywords | 6 |
| SPAM | 3 | check if content represents generic spam | 1 |
| KEYWORD\_PRESET | 4 | check if content contains words from internal pre-defined wordsets | 1 |
| MENTION\_SPAM | 5 | check if content contains more unique mentions than allowed | 1 |

## Trigger Metadata

Additional data used to determine whether a rule should be triggered. Different fields are relevant based on the value of [trigger\_type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types).

| Field | Type | Associated Trigger Types | Description |
| --- | --- | --- | --- |
| keyword\_filter | array of strings \* | KEYWORD | substrings which will be searched for in content (Maximum of 1000) |
| regex\_patterns | array of strings \*\* | KEYWORD | regular expression patterns which will be matched against content (Maximum of 10) |
| presets | array of [keyword preset types](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-preset-types) | KEYWORD\_PRESET | the internally pre-defined wordsets which will be searched for in content |
| allow\_list | array of strings \*\*\* | KEYWORD, KEYWORD\_PRESET | substrings which should not trigger the rule (Maximum of 100 or 1000) |
| mention\_total\_limit | integer | MENTION\_SPAM | total number of unique role and user mentions allowed per message (Maximum of 50) |

\* A keyword can be a phrase which contains multiple words. [Wildcard symbols](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-matching-strategies) can be used to customize how each keyword will be matched. Each keyword must be 60 characters or less.

\*\* Only Rust flavored regex is currently supported, which can be tested in online editors such as [Rustexp](https://rustexp.lpil.uk/). Each regex pattern must be 260 characters or less.

\*\*\* Each ```allow_list``` keyword can be a phrase which contains multiple words. [Wildcard symbols](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-keyword-matching-strategies) can be used to customize how each keyword will be matched. Rules with ```KEYWORD``` [trigger\_type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types) accept a maximum of 100 keywords. Rules with ```KEYWORD_PRESET``` [trigger\_type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types) accept a maximum of 1000 keywords.

## Trigger Metadata Field Limits

| Field | Trigger Type | MAX ARRAY LENGTH | MAX CHARACTERS PER STRING |
| --- | --- | --- | --- |
| keyword\_filter | KEYWORD | 1000 | 60 |
| regex\_patterns | KEYWORD | 10 | 260 |
| allow\_list | KEYWORD | 100 | 60 |
| allow\_list | KEYWORD\_PRESET | 1000 | 60 |

## Keyword Preset Types

| Preset Type | Value | Description |
| --- | --- | --- |
| PROFANITY | 1 | words that may be considered forms of swearing or cursing |
| SEXUAL\_CONTENT | 2 | words that refer to sexually explicit behavior or activity |
| SLURS | 3 | personal insults or words that may be considered hate speech |

## Event Types

Indicates in what event context a rule should be checked.

| Event Type | Value | Description |
| --- | --- | --- |
| MESSAGE\_SEND | 1 | when a member sends or edits a message in the guild |

## Keyword Matching Strategies

Use the wildcard symbol (```*```) at the beginning or end of a keyword to define how it should be matched. All keywords are case insensitive.

Prefix - word must start with the keyword

| Keyword | Matches |
| --- | --- |
| cat\* | catch, Catapult, CAttLE |
| tra\* | train, trade, TRAditional |
| the mat\* | the matrix |

Suffix - word must end with the keyword

| Keyword | Matches |
| --- | --- |
| \*cat | wildcat, copyCat |
| \*tra | extra, ultra, orchesTRA |
| \*the mat | breathe mat |

Anywhere - keyword can appear anywhere in the content

| Keyword | Matches |
| --- | --- |
| \*cat\* | location, eduCation |
| \*tra\* | abstracted, outrage |
| \*the mat\* | breathe matter |

Whole Word - keyword is a full word or phrase and must be surrounded by whitespace

| Keyword | Matches |
| --- | --- |
| cat | cat |
| train | train |
| the mat | the mat |

## Auto Moderation Action Object

An action which will execute whenever a rule is triggered.

## Auto Moderation Action Structure

| Field | Type | Description |
| --- | --- | --- |
| type | [action type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types) | the type of action |
| metadata? \* | [action metadata](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata) | additional metadata needed during execution for this specific action type |

\* Can be omitted based on ```type```. See the ```Associated Action Types``` column in [action metadata](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-metadata) to understand which ```type``` values require ```metadata``` to be set.

## Action Types

| Action Type | Value | Description |
| --- | --- | --- |
| BLOCK\_MESSAGE | 1 | blocks a member's message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked. |
| SEND\_ALERT\_MESSAGE | 2 | logs user content to a specified channel |
| TIMEOUT | 3 | timeout user for a specified duration \* |

\* A ```TIMEOUT``` action can only be set up for ```KEYWORD``` and ```MENTION_SPAM``` rules. The ```MODERATE_MEMBERS``` permission is required to use the ```TIMEOUT``` action type.

## Action Metadata

Additional data used when an action is executed. Different fields are relevant based on the value of [action type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types).

| Field | Type | Associated Action Types | Description | Constraints |
| --- | --- | --- | --- | --- |
| channel\_id | snowflake | SEND\_ALERT\_MESSAGE | channel to which user content should be logged | existing channel |
| duration\_seconds | integer | TIMEOUT | timeout duration in seconds | maximum of 2419200 seconds (4 weeks) |
| custom\_message? | string | BLOCK\_MESSAGE | additional explanation that will be shown to members whenever their message is blocked | maximum of 150 characters |

## Auto Moderation Permission Requirements

Users are required to have the ```MANAGE_GUILD``` permission to access all Auto Moderation resources. Some [action types](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object-action-types) require additional permissions, e.g. the ```TIMEOUT``` action type requires an additional ```MODERATE_MEMBERS``` permission.

List Auto Moderation Rules for Guild[

](#list-auto-moderation-rules-for-guild)
-------------------------------------------------------------------------------

GET/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules

Get a list of all rules currently configured for the guild. Returns a list of [auto moderation rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) objects for the given guild.

This endpoint requires the ```MANAGE_GUILD``` [permission](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-permission-requirements).

Get Auto Moderation Rule[

](#get-auto-moderation-rule)
-------------------------------------------------------

GET/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules/[{auto\_moderation\_rule.id}](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object)

Get a single rule. Returns an [auto moderation rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) object.

This endpoint requires the ```MANAGE_GUILD``` [permission](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-permission-requirements).

Create Auto Moderation Rule[

](#create-auto-moderation-rule)
-------------------------------------------------------------

POST/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules

Create a new rule. Returns an [auto moderation rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) on success. Fires an [Auto Moderation Rule Create](https://ptb.discord.com/developers/docs/topics/gateway-events#auto-moderation-rule-create) Gateway event.

This endpoint requires the ```MANAGE_GUILD``` [permission](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-permission-requirements).

This endpoint supports the ```X-Audit-Log-Reason``` header.

## List Auto Moderation Rules for Guild

GET

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules

## Get Auto Moderation Rule

GET

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules/[{auto\_moderation\_rule.id}](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object)

## Create Auto Moderation Rule

POST

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | the rule name |
| event\_type | integer | the [event type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types) |
| trigger\_type | integer | the [trigger type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types) |
| trigger\_metadata? \* | object | the [trigger metadata](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) |
| actions | array of [action](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object) objects | the actions which will execute when the rule is triggered |
| enabled? | boolean | whether the rule is enabled (False by default) |
| exempt\_roles? | array of snowflakes | the role ids that should not be affected by the rule (Maximum of 20) |
| exempt\_channels? | array of snowflakes | the channel ids that should not be affected by the rule (Maximum of 50) |

\* Can be omitted based on ```trigger_type```. See the ```Associated Trigger Types``` column in [trigger metadata](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) to understand which ```trigger_type``` values require ```trigger_metadata``` to be set.

See [Trigger Types](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-types) for limits on how many rules of each trigger type can be created per guild.

Modify Auto Moderation Rule[

](#modify-auto-moderation-rule)
-------------------------------------------------------------

PATCH/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules/[{auto\_moderation\_rule.id}](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object)

Modify an existing rule. Returns an [auto moderation rule](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object) on success. Fires an [Auto Moderation Rule Update](https://ptb.discord.com/developers/docs/topics/gateway-events#auto-moderation-rule-update) Gateway event.

Requires ```MANAGE_GUILD``` [permissions](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-permission-requirements).

All parameters for this endpoint are optional.

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Modify Auto Moderation Rule

PATCH

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules/[{auto\_moderation\_rule.id}](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object)

## JSON Params

| Field | Type | Description |
| --- | --- | --- |
| name | string | the rule name |
| event\_type | integer | the [event type](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-event-types) |
| trigger\_metadata? \* | object | the [trigger metadata](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) |
| actions | array of [action](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-action-object) objects | the actions which will execute when the rule is triggered |
| enabled | boolean | whether the rule is enabled |
| exempt\_roles | array of snowflakes | the role ids that should not be affected by the rule (Maximum of 20) |
| exempt\_channels | array of snowflakes | the channel ids that should not be affected by the rule (Maximum of 50) |

\* Can be omitted based on ```trigger_type```. See the ```Associated Trigger Types``` column in [trigger metadata](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object-trigger-metadata) to understand which ```trigger_type``` values require ```trigger_metadata``` to be set.

Delete Auto Moderation Rule[

](#delete-auto-moderation-rule)
-------------------------------------------------------------

DELETE/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules/[{auto\_moderation\_rule.id}](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object)

Delete a rule. Returns a ```204``` on success. Fires an [Auto Moderation Rule Delete](https://ptb.discord.com/developers/docs/topics/gateway-events#auto-moderation-rule-delete) Gateway event.

This endpoint requires the ```MANAGE_GUILD``` [permission](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-permission-requirements).

This endpoint supports the ```X-Audit-Log-Reason``` header.

## Delete Auto Moderation Rule

DELETE

/guilds/[{guild.id}](https://ptb.discord.com/developers/docs/resources/guild#guild-object)/auto-moderation/rules/[{auto\_moderation\_rule.id}](https://ptb.discord.com/developers/docs/resources/auto-moderation#auto-moderation-rule-object)

