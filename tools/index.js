const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const url = 'https://ptb.discord.com/developers/docs';

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'], windowSize: { width: 1920, height: 1080 } });
  const page = await browser.newPage();
  console.log('Navigating to:', url);
  await page.goto(url);
  console.log('Waiting for API documentation to load...');
  await page.waitForSelector('.shakeShake-1CacCa', { visible: true });
  console.log('API documentation loaded. Scraping...');

  let urls = [
    'https://ptb.discord.com/developers/docs/intro',
    'https://ptb.discord.com/developers/docs/getting-started',
    'https://ptb.discord.com/developers/docs/change-log',
    'https://ptb.discord.com/developers/docs/reference',
    'https://ptb.discord.com/developers/docs/interactions/application-commands',
    'https://ptb.discord.com/developers/docs/interactions/message-components',
    'https://ptb.discord.com/developers/docs/interactions/receiving-and-responding',
    'https://ptb.discord.com/developers/docs/resources/application',
    'https://ptb.discord.com/developers/docs/resources/application-role-connection-metadata',
    'https://ptb.discord.com/developers/docs/resources/audit-log',
    'https://ptb.discord.com/developers/docs/resources/auto-moderation',
    'https://ptb.discord.com/developers/docs/resources/channel',
    'https://ptb.discord.com/developers/docs/resources/emoji',
    'https://ptb.discord.com/developers/docs/resources/guild',
    'https://ptb.discord.com/developers/docs/resources/guild-scheduled-event',
    'https://ptb.discord.com/developers/docs/resources/guild-template',
    'https://ptb.discord.com/developers/docs/resources/invite',
    'https://ptb.discord.com/developers/docs/resources/stage-instance',
    'https://ptb.discord.com/developers/docs/resources/sticker',
    'https://ptb.discord.com/developers/docs/resources/user',
    'https://ptb.discord.com/developers/docs/resources/voice',
    'https://ptb.discord.com/developers/docs/resources/webhook',
    'https://ptb.discord.com/developers/docs/topics/certified-devices',
    'https://ptb.discord.com/developers/docs/topics/community-resources',
    'https://ptb.discord.com/developers/docs/topics/gateway',
    'https://ptb.discord.com/developers/docs/topics/gateway-events',
    'https://ptb.discord.com/developers/docs/topics/oauth2',
    'https://ptb.discord.com/developers/docs/topics/opcodes-and-status-codes',
    'https://ptb.discord.com/developers/docs/topics/permissions',
    'https://ptb.discord.com/developers/docs/topics/rpc',
    'https://ptb.discord.com/developers/docs/topics/rate-limits',
    'https://ptb.discord.com/developers/docs/topics/teams',
    'https://ptb.discord.com/developers/docs/topics/threads',
    'https://ptb.discord.com/developers/docs/topics/voice-connections',
    'https://ptb.discord.com/developers/docs/tutorials/configuring-app-metadata-for-linked-roles',
    'https://ptb.discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers',
    'https://ptb.discord.com/developers/docs/tutorials/upgrading-to-application-commands',
    'https://ptb.discord.com/developers/docs/game-and-server-management/how-to-get-your-game-on-discord',
    'https://ptb.discord.com/developers/docs/game-and-server-management/alpha-and-beta-testing',
    'https://ptb.discord.com/developers/docs/game-and-server-management/special-channels',
    'https://ptb.discord.com/developers/docs/rich-presence/how-to',
    'https://ptb.discord.com/developers/docs/rich-presence/best-practices',
    'https://ptb.discord.com/developers/docs/rich-presence/launch-checklist',
    'https://ptb.discord.com/developers/docs/rich-presence/faq',
    'https://ptb.discord.com/developers/docs/game-sdk/sdk-starter-guide',
    'https://ptb.discord.com/developers/docs/game-sdk/discord',
    'https://ptb.discord.com/developers/docs/game-sdk/achievements',
    'https://ptb.discord.com/developers/docs/game-sdk/activities',
    'https://ptb.discord.com/developers/docs/game-sdk/applications',
    'https://ptb.discord.com/developers/docs/game-sdk/discord-voice',
    'https://ptb.discord.com/developers/docs/game-sdk/images',
    'https://ptb.discord.com/developers/docs/game-sdk/lobbies',
    'https://ptb.discord.com/developers/docs/game-sdk/networking',
    'https://ptb.discord.com/developers/docs/game-sdk/overlay',
    'https://ptb.discord.com/developers/docs/game-sdk/relationships',
    'https://ptb.discord.com/developers/docs/game-sdk/storage',
    'https://ptb.discord.com/developers/docs/game-sdk/store',
    'https://ptb.discord.com/developers/docs/game-sdk/users',
    'https://ptb.discord.com/developers/docs/dispatch/dispatch-and-you',
    'https://ptb.discord.com/developers/docs/dispatch/branches-and-builds',
    'https://ptb.discord.com/developers/docs/dispatch/list-of-commands',
    'https://ptb.discord.com/developers/docs/dispatch/error-codes',
    'https://ptb.discord.com/developers/docs/dispatch/field-values',
    'https://ptb.discord.com/developers/docs/policies-and-agreements/developer-policy',
    'https://ptb.discord.com/developers/docs/policies-and-agreements/developer-terms-of-service'
  ]


  console.log('Found the following URLs:', urls);
  for (const url of urls) {
    setTimeout(() => {
        console.log('Waiting 2 second...');
    }, 2000)
    console.log(`Scraping ${url}...`);
    console.log("Hi")
    const subPage = await browser.newPage();
    await subPage.goto(url);

    const pageTitle = await subPage.title();
    const markdownTitle = `# ${pageTitle}\n\n`;
    const fileName = `${pageTitle}.md`;

    const content = await subPage.evaluate(() => {
        console.log('Evaluating...')
      const mainDiv = document.querySelector('.shakeShake-1CacCa');
      const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      const headings = mainDiv.querySelectorAll(headingTags.join(','));
        //Format the <table> tags
        const tables = mainDiv.querySelectorAll('table');
      console.log(tables)
        console.log(mainDiv)
      const chapters = Array.from(headings).map((heading) => {
        const chapter = {
          title: heading.innerText,
          content: [],
        };

        let currentElement = heading.nextElementSibling;
        while (currentElement && !headingTags.includes(currentElement.tagName.toLowerCase())) {
          chapter.content.push(currentElement.outerHTML);
          currentElement = currentElement.nextElementSibling;
        }

        return chapter;
      });
      console.log(chapters)
      return chapters;
    });

    await subPage.close();

    console.log(`Scraping of ${url} complete. Writing to file...`);

    const markdown = markdownTitle + content.map(chapter => {
      let result = `## ${chapter.title}\n\n`;
      result += chapter.content.map(html => {
        let modified = html
        modified.replaceAll(`<li>`, "- ")
        modified.replaceAll("<pre>", "```")
        modified.replaceAll("</pre>", "```")
        console.log( modified)
// For Node.js
var TurndownService = require('turndown')
var turndownPluginGfm = require('turndown-plugin-gfm')
var gfm = turndownPluginGfm.gfm
var tables = turndownPluginGfm.tables
var strikethrough = turndownPluginGfm.strikethrough

var turndownService = new TurndownService({codeBlockStyle: 'fenced'})
turndownService.use(gfm)
turndownService.addRule('code', {
  filter: ['code',],
  replacement: function (content) {
    return '```' + content + '```'
  }
})
turndownService.addRule('code', {
  filter: ['code',],
  replacement: function (content) {
    return '```' + content + '```'
  }
})

// Use the table and strikethrough plugins only
turndownService.use([tables, strikethrough])
var markdown = turndownService.turndown(html)
        const dom = new JSDOM( modified);
        const text = markdown;
        return `${text}\n\n`;
      }).join('');
      return result;
    }).join('');

    fs.writeFile(__dirname + "/ddev/" + fileName, markdown, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log(`File saved as "${fileName}"`);
      }
    });
  }

  await browser.close();

  console.log('All scraping complete.');
})();
