require('dotenv').config("config.env");
const tmi = require('tmi.js');
const fs = require('fs');
const chalk = require('chalk');
const { Console } = require('console');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let badUsers = [];

//Preparing the client
const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true
    },
    identity: { //User authentication
        username: process.env.USERNAME,
        password: process.env.TOKKEN_TWITCH
    },
    channels: [process.env.CHANNEL_NAME] //Channel that will have access to the bot
});



//Reading the ban.txt file
try {
    const data = fs.readFileSync("ban.txt", 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        if (line.trim() != '') {
            badUsers.push(line.trim());
        }
    });
} catch (err) {
    console.error(err);
}



//Connecting to twitch
client.connect().then(() => {
    console.log(chalk.blueBright("==> Connected to ") 
    + chalk.magenta("Twitch") 
    + chalk.blueBright(", type ")
    + chalk.red("!@#$BANALL")
    + chalk.blueBright(" in chat to initiate the ban <==="));
});



//Checking chat messages
client.on('message', reply);
async function reply(channel, tags, message, self) {
    if (message == '!@#$BANALL') {
        for (let index = 0; index < badUsers.length; index++) {

            const element = badUsers[index];

            //Ban the user
            await client.ban(channel, element.trim(), 'bot').then(function () {
                console.log(chalk.green(`[${index + 1}-${badUsers.length}] ${element} => [Banned]`));
            }).catch(function () {
                console.warn(chalk.grey(`[${index + 1}-${badUsers.length}] ${element} => [Has already been banned]`));
            });
            
            //Delay for next request (800ms)
            await delay(800);
        }
        console.warn(chalk.yellow(`Finished list`));
        process.exit(0);
    }
}