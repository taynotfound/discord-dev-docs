# Discord Developer Portal — Documentation — Getting Started

## Building your first Discord app

Discord apps let you customize and extend your servers using a collection of APIs and interactive features. This guide will walk you through building your first Discord app using JavaScript, and by the end you'll have an app that uses slash commands, sends messages, and responds to component interactions.

We'll be building a Discord app that lets server members play rock-paper-scissors (with 7 choices instead of the usual 3). This guide is beginner-focused, but it assumes a basic understanding of [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics).

What we'll be building

Resources used in this guide

Overview of the tools and technologies we'll use

* * *

## Step 1: Creating an app

First, you'll need to create an app in the developer portal if you don't have one already:

[

Create App

](https://discord.comhttps://ptb.discord.com/developers/applications?new_application=true)

Enter a name for your app, then press Create.

After you create your app, you'll land on the General Overview page of the app's settings where you can update basic information about your app like its description and icon. You'll also see an Application ID and Interactions Endpoint URL, which we'll use a bit later in the guide.

## Configuring your bot

Next we'll configure the [bot user](https://ptb.discord.com/developers/docs/topics/oauth2#bot-vs-user-accounts) for your app, which allows it to appear and behave similarly to other server members.

On the left hand sidebar click Bot. On this page, you can configure settings like its [privileged intents](https://ptb.discord.com/developers/docs/topics/gateway#privileged-intents) or whether it can be installed by other users.

What are intents?

Introduction to standard and privileged intents

![Bot tab in app settings](https://ptb.discord.com/assets/fa1a421ef8d9e320c29a16975782bafa.png)

There's also a Token section on the Bot page, which allows you to copy and reset your bot's token.

Bot tokens are used to authorize API requests and carry your bot user's permissions, making them highly sensitive. Make sure to never share your token or check it into any kind of version control.

Go ahead and copy the token, and store the token somewhere safe (like in a password manager).

You won't be able to view your token again unless you regenerate it, so make sure to keep it somewhere safe.

## Adding scopes and bot permissions

Apps need approval from installing users to perform actions in Discord (like creating a slash command or fetching a list of server members). Let's select a few scopes and permissions to request before installing the app.

What are scopes and permissions?

Introduction to scopes and bot permissions

Click on OAuth2 in the left sidebar, then select URL generator.

The URL generator creates an installation link based on the scopes and permissions you select for your app. You can use the link to install the app onto your own server, or share it with others so they can install it.

For now, add two scopes:

*   ```applications.commands``` which allows your app to create [commands](https://ptb.discord.com/developers/docs/interactions/application-commands).
*   ```bot``` adds your bot user. After you select ```bot```, you can also select different permissions for your bot. For now, just check Send Messages.

See a list of all [OAuth2 scopes](https://ptb.discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes), or read more on [permissions](https://ptb.discord.com/developers/docs/topics/permissions) in the documentation.

## Installing your app

Once you add scopes, you should see a URL that you can copy to install your app.

![URL generator screenshot](https://ptb.discord.com/assets/fa29b930b00a68b94429ace7bd4df4f9.png)

When developing apps, you should build and test in a server that isn't actively used by others. If you don't have your own server already, you can [create one for free](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-).

Copy the URL from above, and paste it into your browser. You'll be guided through the installation flow, where you should make sure you're installing your app on a server where you can develop and test it.

After installing your app, you can head over to your server and see that it has joined ✨

With your app configured and installed, let's start developing it.

* * *

## Step 2: Running your app

All of the code used in the example app can be found in [the Github repository](https://github.com/discord/discord-example-app).

To make development a bit simpler, the app uses [discord-interactions](https://github.com/discord/discord-interactions-js), which provides types and helper functions. If you prefer to use other languages or libraries, check out the [Community Resources](https://ptb.discord.com/developers/docs/topics/community-resources) documentation.

## Remixing the project

This guide uses Glitch, which lets you clone and develop within your browser. If you'd prefer to develop your app locally, there's instructions on using ngrok [in the README](https://github.com/discord/discord-example-app#running-app-locally).

While Glitch is great for development and testing, [it has technical restrictions](https://help.glitch.com/kb/article/17-technical-restrictions/) so other hosting providers should be considered for production apps.

To start, [remix (or clone) the Glitch project 🎏](https://glitch.com/edit/#!/import/git?url=https://github.com/discord/discord-example-app.git).

Once you remix the project, you'll land on a new Glitch project.

Glitch project interface

Overview of Glitch's project interface

## Project structure

All of the files for the project are on the left-hand side of your Glitch project. Below is an overview of the main folders and files:

```
├── examples    -> short, feature-specific sample apps
│   ├── app.js  -> finished app.js code
│   ├── button.js
│   ├── command.js
│   ├── modal.js
│   ├── selectMenu.js
├── .env        -> your credentials and IDs
├── app.js      -> main entrypoint for app
├── commands.js -> slash command payloads + helpers
├── game.js     -> logic specific to RPS
├── utils.js    -> utility functions and enums
├── package.json
├── README.md
└── .gitignore
```

## Adding credentials

There's already some code in your ```app.js``` file, but you'll need your app's token and ID to make requests. All of your credentials can be stored directly in the ```.env``` file.

First, copy your bot user's token from earlier and paste it in the ```DISCORD_TOKEN``` variable in your ```.env``` file.

Next, navigate to your app's General Overview page, then copy the App ID and Public Key. Paste the values in your ```.env``` file as ```APP_ID``` and ```PUBLIC_KEY```.

With your credentials configured, let's install and handle slash commands.

## Installing slash commands

To install slash commands, the app is using [```node-fetch```](https://github.com/node-fetch/node-fetch). You can see the implementation for the installation in ```utils.js``` within the ```DiscordRequest()``` function.

The project contains a ```register``` script you can use to install the commands in ```ALL_COMMANDS```, which is defined at the bottom of ```commands.js```. It installs the commands as global commands by calling the HTTP API's [```PUT /applications/<APP_ID>/commands```](https://ptb.discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands) endpoint.

If you want to customize your commands or add additional ones, you can reference the command structure in the [commands documentation](https://ptb.discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-structure).

Run the ```register``` script by clicking Terminal at the bottom of your Glitch project and pasting the following command:

```
npm run register
```

Hit enter to run the command.

If you navigate back to your server, you should see the slash commands appear. But if you try to run them, nothing will happen since your app isn't receiving or handling any requests from Discord.

What are Discord's APIs?

Overview of Discord's HTTP and Gateway APIs

* * *

## Step 3: Handling interactivity

To enable your app to receive slash command requests (and other interactions), Discord needs a public URL to send them. This URL can be configured in your app's settings as Interaction Endpoint URL.

## Adding an interaction endpoint URL

Glitch projects have a public URL exposed by default. Copy your project's URL by clicking the Share button in the top right corner, then copy the "Live site" project link near the bottom of the modal.

If you're developing locally, there are instructions for tunneling requests to your local environment [on the Github README](https://github.com/discord/discord-example-app#running-app-locally).

With the link copied, go to your app's settings from [the developer portal](https://discord.comhttps://ptb.discord.com/developers/applications).

On your app's General Information page, there's an Interactive Endpoint URL option, where you can paste your app's URL and append ```/interactions``` to it, which is where the Express app is configured to listen for requests.

![Interactions endpoint URL in app settings](https://ptb.discord.com/assets/124aa3550c1f72f845eee1a8394b6023.png)

Click Save Changes and ensure your endpoint is successfully verified.

The sample app handles verification in two ways:

*   It uses the ```PUBLIC_KEY``` and [discord-interactions package](https://github.com/discord/discord-interactions-js#usage) with a wrapper function (imported from ```utils.js```) that makes it conform to [Express's ```verify``` interface](http://expressjs.com/en/5x/api.html#express.json). This is run on every incoming request to your app.
*   It responds to incoming ```PING``` requests.

You can learn more about preparing your app to receive interactions in [the interactions documentation](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction).

## Handling slash command requests

With the endpoint verified, navigate to your project's ```app.js``` file and find the code block that handles the ```/test``` command:

```
// "test" command
if (name === 'test') {
    // Send a message into the channel where command was triggered from
    return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
        // Fetches a random emoji to send from a helper function
        content: 'hello world ' + getRandomEmoji(),
    },
    });
}
```

The code above is responding to the interaction with a message in the channel it originated from. You can see all available response types, like responding with a modal, [in the documentation](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type).

```InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE``` is a constant [exported from ```discord-interactions```](https://github.com/discord/discord-interactions-js/blob/main/src/index.ts#L33)

Go to your server and make sure your app's ```/test``` slash command works. When you trigger it, your app should send a message that contains “hello world” followed by a random emoji.

In the following section, we'll add an additional command that uses slash command options, buttons, and select menus to build the rock-paper-scissors game.

* * *

## Step 4: Adding message components

The ```/challenge``` command will be how our rock-paper-scissors-style game is initiated. When the command is triggered, the app will send message components to the channel, which will guide the users to complete the game.

## Adding a command with options

The ```/challenge``` command, called ```CHALLENGE_COMMAND``` in ```commands.js```, has an array of ```options```. In our app, the options are objects representing different things that a user can select while playing rock-paper-scissors, generated using keys of ```RPSChoices``` in ```game.js```.

You can read more about command options and their structure [in the documentation](https://ptb.discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure).

While this guide won't touch much on the ```game.js``` file, feel free to poke around and change commands or the options in the commands.

Handling the command interaction

Code for handling the challenge command and responding with a message containing a button

To handle the ```/challenge``` command, add the following code after the ```if name === “test”``` if block:

```
// "challenge" command
if (name === 'challenge' && id) {
    const userId = req.body.member.user.id;
    // User's object choice
    const objectName = req.body.data.options[0].value;

    // Create active game using message ID as the game ID
    activeGames[id] = {
        id: userId,
        objectName,
    };

    return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
        // Fetches a random emoji to send from a helper function
        content: `Rock papers scissors challenge from <@${userId}>`,
        components: [
        {
            type: MessageComponentTypes.ACTION_ROW,
            components: [
            {
                type: MessageComponentTypes.BUTTON,
                // Append the game ID to use later on
                custom_id: `accept_button_${req.body.id}`,
                label: 'Accept',
                style: ButtonStyleTypes.PRIMARY,
            },
            ],
        },
        ],
    },
    });
}
```

If you aren't sure where to paste the code, you can see the full code in ```examples/app.js``` in the Glitch project or the root ```app.js``` [on Github](https://github.com/discord/discord-example-app/blob/main/app.js).

The above code is doing a few things:

1.  Parses the request body to get the ID of the user who triggered the slash command (```userId```), and the option (object choice) they selected (```objectName```).
2.  Adds a new game to the ```activeGames``` object using the interaction ID. The active game records the ```userId``` and ```objectName```.
3.  Sends a message back to the channel with a button with a ```custom_id``` of ```accept_button_<SOME_ID>```.

The sample code uses an object as in-memory storage, but for production apps you should use a database.

When sending a message with [message components](https://ptb.discord.com/developers/docs/interactions/message-components#what-is-a-component), the individual payloads are appended to a ```components``` array. Actionable components (like buttons) need to be inside of an [action row](https://ptb.discord.com/developers/docs/interactions/message-components#action-rows), which you can see in the code sample.

Note the unique ```custom_id``` sent with message components, in this case ```accept_button_``` with the active game's ID appended to it. A ```custom_id``` can be used to handle requests that Discord sends you when someone interacts with the component, which you'll see in a moment.

Now when you run the ```/challenge``` command and pick an option, your app will send a message with an Accept button. Let's add code to handle the button press.

Handling button interactions

Code for handling button clicks and responding with an ephemeral message

When users interact with a message component, Discord will send a request with an [interaction type](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type) of ```3``` (or the ```MESSAGE_COMPONENT``` value when using ```discord-interactions```).

To set up a handler for the button, we'll check the ```type``` of interaction, followed by matching the ```custom_id```.

Paste the following code under the type handler for ```APPLICATION_COMMAND```s:

```
if (type === InteractionType.MESSAGE_COMPONENT) {
// custom_id set in payload when sending message component
const componentId = data.custom_id;

  if (componentId.startsWith('accept_button_')) {
    // get the associated game ID
    const gameId = componentId.replace('accept_button_', '');
    // Delete message with token in request body
    const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
    try {
      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'What is your object of choice?',
          // Indicates it'll be an ephemeral message
          flags: InteractionResponseFlags.EPHEMERAL,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.STRING_SELECT,
                  // Append game ID
                  custom_id: `select_choice_${gameId}`,
                  options: getShuffledOptions(),
                },
              ],
            },
          ],
        },
      });
      // Delete previous message
      await DiscordRequest(endpoint, { method: 'DELETE' });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }
}
```

The above code:

1.  Checks for a ```custom_id``` that matches what we originally sent (in this case, it starts with ```accept_button_```). The custom ID also has the active game ID appended, so we store that in ```gameID```.
2.  [Deletes the original message](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#delete-original-interaction-response) calling a webhook using ```node-fetch``` and passing the unique interaction ```token``` in the request body. This is done to clean up the channel, and so other users can't click the button.
3.  Responds to the request by sending a message that contains a select menu with the object choices for the game. The payload should look fairly similar to the previous one, with the exception of the ```options``` array and ```flags: 64```, [which indicates that the message is ephemeral](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#create-followup-message).

The ```options``` array is populated using the ```getShuffledOptions()``` method in ```game.js```, which manipulates the ```RPSChoices``` values to conform to the shape of [message component options](https://ptb.discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure).

Handling select menu interactions

Code for responding to select menu interactions and updating the game state

The last thing to add is code to handle select menu interactions, and to send the result of the game to channel.

Since select menus are just another message component, the code to handle their interactions will be almost identical to buttons.

Modify the code above to handle the select menu:

```
if (type === InteractionType.MESSAGE_COMPONENT) {
// custom_id set in payload when sending message component
const componentId = data.custom_id;

  if (componentId.startsWith('accept_button_')) {
    // get the associated game ID
    const gameId = componentId.replace('accept_button_', '');
    // Delete message with token in request body
    const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;
    try {
      await res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'What is your object of choice?',
          // Indicates it'll be an ephemeral message
          flags: InteractionResponseFlags.EPHEMERAL,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.STRING_SELECT,
                  // Append game ID
                  custom_id: `select_choice_${gameId}`,
                  options: getShuffledOptions(),
                },
              ],
            },
          ],
        },
      });
      // Delete previous message
      await DiscordRequest(endpoint, { method: 'DELETE' });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  } else if (componentId.startsWith('select_choice_')) {
    // get the associated game ID
    const gameId = componentId.replace('select_choice_', '');

    if (activeGames[gameId]) {
      // Get user ID and object choice for responding user
      const userId = req.body.member.user.id;
      const objectName = data.values[0];
      // Calculate result from helper function
      const resultStr = getResult(activeGames[gameId], {
        id: userId,
        objectName,
      });

      // Remove game from storage
      delete activeGames[gameId];
      // Update message with token in request body
      const endpoint = `webhooks/${process.env.APP_ID}/${req.body.token}/messages/${req.body.message.id}`;

      try {
        // Send results
        await res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: resultStr },
        });
        // Update ephemeral message
        await DiscordRequest(endpoint, {
          method: 'PATCH',
          body: {
            content: 'Nice choice ' + getRandomEmoji(),
            components: []
          }
        });
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  }
}
```

Similar to earlier code, the code above is getting the user ID and their object selection from the interaction request.

That information, along with the original user's ID and selection from the ```activeGames``` object, are passed to the ```getResult()``` function. ```getResult()``` determines the winner, then builds a readable string to send back to the channel.

We're also calling another webhook, this time to [update the follow-up ephemeral message](https://ptb.discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message) since it can't be deleted.

Finally, the results are sent in the channel using the ```CHANNEL_MESSAGE_WITH_SOURCE``` interaction response type.

....and that's it 🎊 Go ahead and test your app and make sure everything works.

* * *

## Next steps

Congrats on building your first Discord app! 🤖

Hopefully you learned a bit about Discord apps, how to configure them, and how to make them interactive. From here, you can continue building out your app or explore what else is possible:

*   Read [the documentation](https://ptb.discord.com/developers/docs/intro) for in-depth information about API features
*   Browse the ```examples/``` folder in this project for smaller, feature-specific code examples
*   Check out [community resources](https://ptb.discord.com/developers/docs/topics/community-resources) for language-specific tools maintained by community members
*   Read our tutorial on [hosting Discord apps on Cloudflare Workers](https://ptb.discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers)
*   Join the [Discord Developers server](https://discord.gg/discord-developers) to ask questions about the API, attend events hosted by the Discord API team, and interact with other devs

