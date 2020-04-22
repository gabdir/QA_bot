const quiz = require('./quiz')

const questions = quiz.questions
var data = []
const prepared_questions = []

let i; 
for (i = 0; i < questions.length; i++){
    const title = `${questions[i].text}`
    data.push({title: title, buttons: [{text: 'Reply', callback_data: 'reply'}], right_answer: `${questions[i].answers[questions[i].correct_answer]}`, prepared: `${[questions[i].answers]}`})
    prepared_questions.push((questions[i].text,questions[i].answers))
}

for (i = 0; i < data.length; i ++) {
    data[i].prepared = data[i].prepared.split(',')
}

module.exports = {
    data, 
    getRandomQuestion() {
        var rand = data[Math.floor(Math.random()*data.length)]
        return rand 
    }
}