# Discord Developer Portal — Documentation — Teams

## Teams

Teams are groups of developers on Discord who want to collaborate on apps. On other platforms, these may be referred to as "organizations", "companies", or "teams". We went with the name Teams because it best encompassed all the awesome conglomerates of devs that work together to make awesome things on Discord. Also, we never got picked for kickball in gym class, so now we get to be on a team.

## What Do They Do

Teams allow you and other Discord users to share access to apps. No more sharing login credentials in order to reset the token on a bot that your friend owns but you work on, or other such cases.

For game developers, this means that you can get your engineers access to your app for credentials they may need, your marketing folks access to store page management, and your finance people access to sales and performance metrics.

For the initial release, Teams only support one kind of user: Admin. Admins have full access to all parts of an app except for deleting the app and adding/removing users. That can only be done by the owner of the Team.

## How Do I Make One

Making a Team is easy! Head on over to our [Team creation](https://discord.comhttps://ptb.discord.com/developers/teams) page and make your own.

![Screenshot of the initial landing page for viewing Teams that you are a part of](https://ptb.discord.com/assets/72420f34cabd548202285566aa0926fc.png)

Note that to use Discord Teams, you need to have 2FA enabled on your account. Security is of the utmost importance, especially when it comes to shared resources. If you're developing on your own and don't want to use Teams, you do not need 2FA. But, in order to keep other Team members safe, you'll need to add it to use Teams.

![Screenshot of the 2FA requirement modal](https://ptb.discord.com/assets/6e831f7780380cb73e8f3c9b6b640c42.png)

Once your team is made, you can start inviting other Discord users to join.

For the initial release, only the Team owner can invite or remove additional users.

## Apps on Teams

Now that you've got your Team set up, you can start creating apps under it. Teams can own a maximum of 25 apps. To create a new app under a Team, select the Team in the app creation modal. If you want to keep the app under your own ownership, choose ```Personal```:

![Screenshot of the Team Application creation modal](https://ptb.discord.com/assets/511587f064422be22f4380fd1e398253.png)

If you have an existing app that you want to transfer to a Team, you can do that, too! Just go into the app that you want to transfer, hit ```Transfer App to Team```, and send the app to its new home.

![Screenshot of where to find the button to transfer an Application to a Team](https://ptb.discord.com/assets/4ab44ea24b8dea325d9416feef311096.png)

Once an app has been transferred to a team, it cannot be transferred back.

## What Next

What next? Go make awesome stuff! Whether you're a Game Developer, Mad Bot Scientist, or OAuth2 Enthusiast, you can now work together with other like-minded Discordians to bring your creations to life.

We've got a lot of awesome features planned for teams in the future, so stay tuned for things like:

*   Roles and Permissions
*   Audit Logs
*   More cat pictures

Go team!

## Data Models

## Team Object

| field | type | description |
| --- | --- | --- |
| icon | ?string | a hash of the image of the team's icon |
| id | snowflake | the unique id of the team |
| members | array of [team member](https://ptb.discord.com/developers/docs/topics/teams#data-models-team-member-object) objects | the members of the team |
| name | string | the name of the team |
| owner\_user\_id | snowflake | the user id of the current team owner |

## Team Member Object

| field | type | description |
| --- | --- | --- |
| membership\_state | integer | the user's [membership state](https://ptb.discord.com/developers/docs/topics/teams#data-models-membership-state-enum) on the team |
| permissions | array of strings | will always be ```["*"]``` |
| team\_id | snowflake | the id of the parent team of which they are a member |
| user | partial [user](https://ptb.discord.com/developers/docs/resources/user#user-object) object | the avatar, discriminator, id, and username of the user |

## Membership State Enum

| name | value |
| --- | --- |
| INVITED | 1 |
| ACCEPTED | 2 |

