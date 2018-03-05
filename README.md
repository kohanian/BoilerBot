# BoilerBot
A messenger "bot" for March Madness

## Setup
1. Run `npm install`
2. Run `node index.js` to start

### Create .env
For environment variable, create a .env file with the necessary variables.

**.env**
```
BOILER_BOT_EMAIL "facebook_email_goes_here"
BOILER_BOT_PASS  "facebook_password_goes_here"
BOILER_BOT_GROUP "thread_id_goes_here"
```
**NOTE: BOILER_BOT_GROUP is only used for the joinLink module, which doesn't listen for messages, and therefore doesn't have message.threadID.**

## Navigation
* [Leaderboard](#leaderboard)
* [Scoreboard](#scoreboard)

## Message Commands
### Leaderboard
`\leaderboard`

Get's the leaderboard of the Purdue 2018 Bracket Challenge

### Scoreboard
`\scores`

Get's the daily scores of College Basketball
