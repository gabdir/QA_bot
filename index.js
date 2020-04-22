const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const session = require('telegraf/session')
const fetch = require('node-fetch')

const TelegrafInlineMenu = require('telegraf-inline-menu')
const menu = new TelegrafInlineMenu(ctx => `Hey ${ctx.from.first_name}!`)
menu.setCommand('start')
 
menu.simpleButton('I am excited!', 'a', {
  doFunc: ctx => ctx.reply('As am I!')
})

const quiz = require('./quiz')
const prepared_data = require('./data')

const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
  socksHost: '127.0.0.1',
  socksPort: '9150',
});


const bot = new Telegraf(process.env.BOT_TOKEN, {
    telegram: { agent: socksAgent }
});

bot.start((ctx) => {
    return ctx.reply(`Добро пожаловать! 
Если ты хочешь узнать о командах - набери /help
Если же ты хочешь начать квиз - набери /quiz
    `);


});

bot.hears(/\/help/, (ctx) => {
    ctx.reply('Here are available commands:',
    Extra.HTML()).then(() => {
        ctx.reply('/start - To start messaging', Extra.HTML())
        ctx.reply('/help - To see available commands', Extra.HTML())
        ctx.reply('/quiz - To start the quiz', Extra.HTML())
    })
})

function newQuestion(ctx){
    var arr = prepared_data.getRandomQuestion()
    var title = arr.title
    var result = []
    var prepared = arr.prepared
    ctx.telegram.sendMessage(ctx.message.chat.id,arr.title, {reply_markup:{
        inline_keyboard: [[{text: `${arr.buttons[0].text}`, 
        switch_inline_query_current_chat: 'Answers'}]]
    }})
    return arr
}

bot.hears(/\/quiz/, (ctx) => {
    var arr = newQuestion(ctx) 
    var result = []
    bot.on('inline_query', (ctx) => {
        for (i = 0; i < arr.prepared.length; i ++) {
            result.push({id: i.toString(), type:'article',title: `${arr.prepared[i]}`, input_message_content:{
                message_text: `${arr.prepared[i]}` 
            }})
        }
        var ar = [...result]
        console.log(ar)
        result.length = 0
        // prepared.map((prep) => result.push(prep))
        return ctx.telegram.answerInlineQuery(ctx.inlineQuery.id,ar, {
            cache_time: 0, 
            switch_pm_text: 'Talk directly', 
            switch_pm_parameter: 'hello'
        })
    })
})



bot.on('message', (ctx) => {
    ctx.reply(`Hello, ${ctx.from.first_name}. How are you?`,
    Extra.HTML()
    .markup(Markup.inlineKeyboard([
        Markup.callbackButton('Ok', 'not bad'),
        Markup.callbackButton('Bad', 'all right')
    ])))
})

bot.action('not bad', (ctx) => {
    ctx.editMessageText(`<i>Have a nice day 😊</i>
Type /quiz if you want to start a quiz.`,
        Extra.HTML())
})
bot.action('all right', (ctx) => {
    ctx.editMessageText('<i>May happiness be with you 🙏</i> Type /quiz if you want to start a quiz.',
        Extra.HTML())
})




bot.launch()