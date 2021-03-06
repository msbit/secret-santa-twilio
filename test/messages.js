'use strict'

require('dotenv').config()

const {each, find, map, startsWith, without} = require('lodash')
const test = require('tape')
const picker = require('../lib/picker')
const getMessages = require('../lib/messages')
const {participants} = require('getconfig')

const NUMBER_LENGTH = 10
const phoneNumberRegex = /^\+1\d{10}$/

test('Messages', (t) => {
  const picked = picker(participants)
  const random = `+1${Math.random().toString().slice(2, 2 + NUMBER_LENGTH)}`
  const messages = getMessages({twilio: {from: random}, participants: picked})

  each(messages, (message) => {
    t.ok(message.from, 'Message has a from')
    t.ok(message.to, 'Message has a to')
    t.ok(message.body, 'Message has a body')

    t.equal(typeof message.from, 'string', 'From is a string')
    t.equal(typeof message.to, 'string', 'To is a string')
    t.equal(typeof message.body, 'string', 'Body is a string')

    t.equal(message.from, random, 'From is correct')
    t.ok(message.from.match(phoneNumberRegex), 'From is a phone number')
    t.ok(message.to.match(phoneNumberRegex), 'To is a phone number')

    const participant = find(picked, {name: message.__name})
    t.ok(startsWith(message.body, `Hey ${participant.name},`), 'Body starts with')

    const {skip} = participant
    const possible = without(map(picked, 'name'), participant.name, ...(Array.isArray(skip) ? skip : []))
    const names = new RegExp(` gift for (?:${possible.join('|')})!$`)
    t.ok(message.body.match(names), 'Body ends with')
  })

  t.end()
})
