let correctAnswerCurrentPos = 0;
let posAnswerCorrect = 0

const numberQuizEvent = () => {
    document.querySelector('input').addEventListener('change', (e) => {
        quizInformation.numberQuiz = parseInt(e.target.value)
        document.querySelector('.quiz-number .value').innerHTML = e.target.value
        document.querySelectorAll('#resume-screen .content-prev-choice .choice .value')[2].innerHTML = e.target.value;
    })
}

const gridProgressQuiz = (numberQuiz) => {
    document.querySelector('.game-progress').innerHTML = ''
    for (var i = 0; i < numberQuiz; i++) {
        document.querySelector('.game-progress').innerHTML += `<div class=""></div>`
    }
    document.querySelector('.game-progress').style.gridTemplateColumns = `repeat(${numberQuiz},1fr)`
}

const answersEvent = () => {
    document.querySelectorAll('.answer').forEach(answer => {
        answer.addEventListener('click', () => {
            if (!AsPlayed) {
                stopTimer()
                if (parseInt(answer.getAttribute('data-valid')) === 0) {
                    answer.classList.add('answer-incorrect')
                    document.querySelectorAll('.answer')[correctAnswerCurrentPos].classList.add('answer-correct')
                    document.querySelectorAll('.game-progress div')[gameProgress.currentQuiz].classList.add('incorrect')
                    userScore.incorrectAnswer++
                } else {
                    answer.classList.add('answer-correct')
                    document.querySelectorAll('.game-progress div')[gameProgress.currentQuiz].classList.add('correct')
                    userScore.correctAnswer++
                }
                AsPlayed = true
                gameProgress.playedQuiz++
                gameProgress.availableQuiz--
                if (gameProgress.availableQuiz === 0) {
                    document.querySelector('.skip-btn').innerHTML = "FINISH"
                    document.querySelector('.skip-btn').setAttribute('data-btn-role', 'endGame')
                } else {
                    document.querySelector('.skip-btn').innerHTML = "NEXT"
                    document.querySelector('.skip-btn').setAttribute('data-btn-role', 'nextQuiz')
                }
            }

        })
    })
}

window.addEventListener('load', () => {
    navigationScreen()
    animationEvent()
    numberQuizEvent()
    playGame()
    replayGame()
    goToLeaveScreen()
    document.querySelector('#loading-screen').classList.replace('active-screen', 'hide-screen')
    document.querySelector('#home-screen').classList.replace('hide-screen', 'active-screen')
})
