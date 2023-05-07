const puppeteer = require('puppeteer');

(async () => {
  // Set up the browser instance
  const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto('https://ptb.discord.com/developers/docs');

  // Find all the sidebar elements
  const sidebars = await page.$$('.mainList-3wfc6h');

  // Extract the URLs from each sidebar
  const urls = await Promise.all(
    sidebars.map(async (sidebar) => {
      const links = await sidebar.$$('a');
      return Promise.all(
        links.map(link => link.getProperty('href').then(href => href.jsonValue()))
      );
    })
  );

  // Flatten the URLs array
  const flattenedUrls = urls.flat();

  // Print the URLs
  console.log(flattenedUrls);

  // Close the browser instance
  await browser.close();
})();
