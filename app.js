const tmi = require('tmi.js');
const fs = require('fs');
const chalk = require('chalk');
const { Console } = require('console');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let badUsers = [];

//Create the .env file if it does not exist
if(!fs.existsSync('.env')){
    let string = 'TOKKEN_TWITCH= \n'
    string += 'USERNAME= \n'    
    string += 'CHANNEL_NAME= '     
    fs.writeFileSync('.env', string);
    console.warn(chalk.redBright(`==> Check the .env file`));
    process.exit(1);
}    

require('dotenv').config();

//Check the parameters of the .env file
if(process.env.USERNAME.trim() == ""){
    console.error(chalk.redBright(`==> Check the .env file: USERNAME is missing`));
    process.exit(1);
}else if(process.env.TOKKEN_TWITCH.trim() == ""){
    console.error(chalk.redBright(`==> Check the .env file: TOKKEN_TWITCH is missing`));
    process.exit(1);
}else if(process.env.CHANNEL_NAME.trim() == ""){
    console.error(chalk.redBright(`==> Check the .env file: CHANNEL_NAME is missing`));
    process.exit(1);
}

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