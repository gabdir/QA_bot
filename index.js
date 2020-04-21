const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

const quiz = require('./quiz')
const prepared_data = require('./data')

const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
  socksHost: '127.0.0.1',
  socksPort: '9150',
//   socksUsername: config.proxy.login,
//   socksPassword: config.proxy.psswd,
});

function replyQuestion(msg) {
    const arr = prepared_data.getRandomQuestion()
    const text = arr.title
    const options = {
        reply_markup: JSON.stringify({inline_keyboard: arr.buttons, parse_mode: 'Markdown'})
    }
    message = msg.message
    chat = message.hasOwnProperty('chat') ?   message.chat.id : message.from.id
    msg.telegram.sendMessage(chat, text, options)
}

const bot = new Telegraf(process.env.BOT_TOKEN, {
    telegram: { agent: socksAgent }
});

bot.hears(/\/help/, (ctx) => {
    ctx.reply('Here are available commands:',
    Extra.HTML())
    ctx.reply('/start - To start messaging', Extra.HTML())
    ctx.reply('/help - To see available commands', Extra.HTML())
    ctx.reply('/quiz - To start the quiz', Extra.HTML())
})

bot.hears(/\/start/, (ctx) => {
    ctx.reply(`Hello, ${ctx.from.first_name}. How are you?`,
    Extra.HTML()
    .markup(Markup.inlineKeyboard([
        Markup.callbackButton('Ok', 'not bad'),
        Markup.callbackButton('Bad', 'all right')
    ])))
})

bot.action('not bad', (ctx) => {
    ctx.editMessageText('<i>Have a nice day 😊</i>',
        Extra.HTML())
})
bot.action('all right', (ctx) => {
    ctx.editMessageText('<i>May happiness be with you 🙏</i>',
        Extra.HTML())
})


bot.hears(/\/quiz/, (ctx) => {
    ctx.reply('Starting quiz...').then(() => {
        replyQuestion(ctx)
    })  
})

bot.on('reply', (ctx) => {
    result = []
    ctx.reply('Nice')
})

bot.launch()