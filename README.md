# secret-santa-twilio

[![Greenkeeper badge](https://badges.greenkeeper.io/lukekarrys/secret-santa-twilio.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/lukekarrys/secret-santa-twilio/master.svg)](https://travis-ci.org/lukekarrys/secret-santa-twilio)

### [Blog Post!](http://lukecod.es/2015/12/02/secret-santa-sms-with-twilio/)

Secret Santa over SMS with Twilio.

**Important: Your Twilio account will need to be properly funded to use this. The cost is $1/mo to get a Twilio number (which can be released after running this) and $0.0075 per message.**


## Config

Here's a sample of what your configuration file should look like:

```js
{
  "twilio": {
    "sid": "SID", // Twilio SID
    "auth": "AUTH", // Twilio auth token
    "from": "+15551234567" // Twilio number to send SMS from
  },
  // Optional message, see lib/messages.js for the default
  "message": "Hey {{name}} buy something for {{recipient}}!",
  "participants": [
    {
      "name": "Luke", // Name, must be unique
      "number": "+15551112222", // Mobile number to send SMS to
      "skip": [] // (Optional) Array of other participant names which they cant be assigned
    },
    {
      "name": "Bob",
      "number": "+15552223333"
    }
  ]
}
```


## Environments

This uses [`getconfig`](https://www.npmjs.com/package/getconfig) to load configuration files based on the environment. So inside the `config/` directory you'll probably want to create a `development.json` file for testing and a `production.json` file for actually sending the SMS.

The `development.json` file will be used by default and `production.json` will be used if you set `NODE_ENV=production` beforing running one of the commands.


## Usage

**This project requires at least Node v6**

First, clone this (or [download the zip](https://github.com/lukekarrys/secret-santa-twilio/zipball/master)) and `npm install` all the dependencies.

Then there are two commands available. As stated above, precede either of these commands with `NODE_ENV=production` to make it use your production config.

### `[NODE_ENV=production] npm run dry`

This will output a list of messages that would be sent.

### `[NODE_ENV=production] npm run send`

This will actually send the messages. It will only output the `sid` and `to` of each SMS sent so that running the script will not give away the recipient of each participant. If you do need to see the full list of recipients, you can check out your [Twilio messaging logs](https://www.twilio.com/console/phone-numbers/incoming).

### Resending

If you need to resend a message without seeing who the participant is, you can do that as long as you have the message sid (from the output or you can get it from the [Twilio message logs](https://www.twilio.com/console/phone-numbers/incoming)). You can also optionally resend the message to a different `to` number.

```
NODE_ENV=production npm run resend -- \
  --sid SMXXXXXX \
  # to is optional, otherwise it will resend to the same number
  --to +15551234567
```


## Tests

The test credentials for twilio are encrypted in `.travis.yml`. If you want to run the tests locally, you will need to create a `.env` file with `TEST_SID` and `TEST_AUTH` values.


## LICENSE

MIT
