const fs = require('fs')
const path = require('path')

const readQuiz = fs.readFileSync(path.join(__dirname, 'questions.json'))
const jsonContent = JSON.parse(readQuiz)
const title = jsonContent["title"]

const questions = jsonContent["questions"]

function between(min, max){
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}

module.exports = { 
    sendQuestion() {
    const rand = between(0, 10)
    const question = questions[rand]
    return question
    }, 
    questions 
}