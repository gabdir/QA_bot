const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
  socksHost: '127.0.0.1',
  socksPort: '9150',
//   socksUsername: config.proxy.login,
//   socksPassword: config.proxy.psswd,
});

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
    ctx.reply(`Hello, ${ctx.from.first_name}. Do you want to start a quiz?`,
    Extra.HTML()
    .markup(Markup.inlineKeyboard([
    Markup.callbackButton('Yes', 'yes'),
    Markup.callbackButton('No', 'no')
    ])))
})


bot.action('yes', (ctx) => {
    ctx.reply('Starting quiz...')
    
})

bot.action('no', (ctx) => {
    ctx.leaveChat()
})

bot.launch()