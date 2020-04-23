const quiz = require('./quiz')

const questions = quiz.questions
var data = []
const prepared_questions = []

let i; 
for (i = 0; i < questions.length; i++){
    const title = `${questions[i].text}`
    const prepared = `${[questions[i].answers]}`
    data.push({title: title, buttons: [{text: 'Reply', callback_data: 'reply'}], obj: {right_answer: `${questions[i].correct_answer}`, prepared: prepared}})
    prepared_questions.push((questions[i].text,questions[i].answers))
}

for (i = 0; i < data.length; i ++) {
    data[i].obj.prepared = data[i].obj.prepared.split(',')
}

module.exports = {
    data, 
    getRandomQuestion() {
        var rand = data[Math.floor(Math.random()*data.length)]
        return rand 
    }
}