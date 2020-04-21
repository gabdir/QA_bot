const quiz = require('./quiz')

const questions = quiz.questions
const data = []

let i; 
for (i = 0; i < questions.length; i++){
    data.push({title: `${questions[i].text}`, buttons: [[{text: 'Reply', callback_data: 'reply'}]], right_answer: `${questions[i].answers[questions[i].correct_answer]}`})
}

module.exports = {
    data, 
    getRandomQuestion() {
        return data[Math.floor(Math.random()*data.length)]
    }
}