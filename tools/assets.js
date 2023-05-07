const fs = require('fs');
const path = require('path');

// Replace "/assets/" with "https://ptb.discord.com/assets/" in a file
function replaceAssets(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const replacedContents = fileContents.replace(/\/developers\//g, 'https://ptb.discord.com/developers/').replace(/\/assets\//g, 'https://ptb.discord.com/assets/');
  fs.writeFileSync(filePath, replacedContents);
}

// Recursively go through all files in a directory and replace "/assets/"
function replaceAssetsInDirectory(dirPath) {
  fs.readdirSync(dirPath).forEach((filename) => {
    console.log(`Checking ${filename}`)
    const filePath = path.join(dirPath, filename);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      replaceAssetsInDirectory(filePath);
    } else {
      if (filename.endsWith('.txt') || filename.endsWith('.md')) {
        console.log(`Replacing Dev in ${filePath}`)
        replaceAssets(filePath);
      }
    }
  });
}

replaceAssetsInDirectory(__dirname + '/ddev');
