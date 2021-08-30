# Banish the BadGuys
## Clearing your chat from malicious accounts


The bot was created in order to make your channel's chat a safer place, so that malicious accounts do not interfere with your content.


## Features

With a simple command, you can ban all accounts automatically, without any problem, if any user is not on the list, you can insert it in the ban.txt text file.

## Preparation
Before starting the installation, you need to check the .env file.
```env
TOKKEN_TWITCH= oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
USERNAME= xxxxxxxxxxx
CHANNEL_NAME= xxxxxxxxxxx
```
The file has 3 fields, where the USERNAME must be the user the bot will use to authenticate to twitch, the TOKKEN_TWITCH must be generated in the link [Twitch Chat OAuth Password Generator](https://twitchapps.com/tmi/) and the CHANNEL_NAME, you must write the channel to which the bot will respond to the command.

## Installation

Banish the BadGuys requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and start the bot. (Ironic, isn't it? a bot that bans other bots)

```sh
cd Banish-the-BadGuys-master
npm i
npm start
```
then, in your twitch channel chat, type the command !@#$BANALL and watch the magic work.

## License

MIT

