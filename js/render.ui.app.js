const renderQuiz = (quizRender) => {
    AsPlayed = false
    document.querySelector('.quiz').innerHTML = quizRender.question
    correctAnswerCurrentPos = getRandomPosCorrectAnswers(0, quizRender.incorrect_answers.length)
    if (correctAnswerCurrentPos > 0) {
        posAnswerCorrect = correctAnswerCurrentPos - 1
    } else {
        posAnswerCorrect = correctAnswerCurrentPos
    }

    let indexIncorrectAnswer = 0
    document.querySelector('.list-answers').innerHTML = ''

    for (var i = 0; i <= quizRender.incorrect_answers.length; i++) {
        if (i === correctAnswerCurrentPos) {
            document.querySelector('.list-answers').innerHTML += `<li class="answer" data-valid="1" >${quizRender.correct_answer}</li>`
        } else {
            if (indexIncorrectAnswer < quizRender.incorrect_answers.length) {
                document.querySelector('.list-answers').innerHTML += `<li class="answer" data-valid="0" >${quizRender.incorrect_answers[indexIncorrectAnswer]}</li>`
                indexIncorrectAnswer++
            }

        }
    }
    answersEvent()
    timerQuiz()
}
