let quizInformation = {
    categoryQuiz: 0,
    levelQuiz: '',
    numberQuiz: 0
}
let indexQuiz = 0
let gameProgress = {
    totalQuiz: 0,
    currentQuiz: 0,
    playedQuiz: 0,
    availableQuiz: 0
}
let userScore = {
    correctAnswer: 0,
    incorrectAnswer: 0,
    totalAnswer: 0,
}
let Quiz;
let AsPlayed = false;

let timerID = 0
const stopTimer = () => {
    clearInterval(timerID)
}
const timerQuiz = () => {
    let min = 1;
    let sec = 59
    document.querySelector('.time').textContent = `${min}:${sec}`
    let idTimer = setInterval(() => {
        document.querySelector('.time').textContent = `${min}:${sec}`
        if (sec > 0) {
            sec--
        }
        if (sec === 0) {
            if (min > 0) {
                min--
                if (sec < 10) {
                    document.querySelector('.time').textContent = `${min}:0${sec}`
                } else {
                    document.querySelector('.time').textContent = `${min}:${sec}`
                }
                sec = 59
            } else {
                if (!AsPlayed) {
                    document.querySelector('.skip-btn').click()
                }
                clearInterval(idTimer)
                document.querySelector('.time').textContent = `${min}:0${sec}`
            }

        } else {
            if (sec < 10) {
                document.querySelector('.time').textContent = `${min}:0${sec}`
            } else {
                document.querySelector('.time').textContent = `${min}:${sec}`
            }
        }


    }, 100)
    timerID = idTimer;
}

const quizLabelChange = (currentQuiz) => {
    document.querySelector('.question-number').textContent = `Question ${currentQuiz}`
}
const renderResult = () => {
    document.querySelector('.question .value').textContent = `${ quizInformation.numberQuiz}`
    document.querySelector('.Correct .value').textContent = `${userScore.correctAnswer}`
    document.querySelector('.Incorrect .value').textContent = `${userScore.incorrectAnswer}`
    let score = (userScore.correctAnswer * 100) / (quizInformation.numberQuiz)
    if (userScore.correctAnswer === quizInformation.numberQuiz) {
        document.querySelector('.score').textContent = '100'
    } else {
        document.querySelector('.score').textContent = Math.round(score)
    }
}
const restGame = () => {
    gameProgress.totalQuiz = 0
    gameProgress.playedQuiz = 0
    gameProgress.currentQuiz = 0
    gameProgress.availableQuiz = 0
    AsPlayed = false
    document.querySelector('.skip-btn').innerHTML = "SKIP"
    document.querySelector('.skip-btn').setAttribute('data-btn-role', 'skipQuiz')
    userScore.correctAnswer = 0
    userScore.incorrectAnswer = 0
    userScore.totalAnswer = 0
    indexQuiz = 0
}
const getRandomPosCorrectAnswers = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const progressGame = () => {
    document.querySelector('.skip-btn').addEventListener('click', () => {
        indexQuiz++
        quizLabelChange(indexQuiz)
        if (document.querySelector('.skip-btn').getAttribute('data-btn-role') === "nextQuiz") {
            document.querySelector('.skip-btn').innerHTML = "SKIP"
            document.querySelector('.skip-btn').setAttribute('data-btn-role', 'skipQuiz')
            gameProgress.currentQuiz++
            renderQuiz(Quiz[gameProgress.currentQuiz])
        } else if (document.querySelector('.skip-btn').getAttribute('data-btn-role') === "skipQuiz") {
            stopTimer()
            if (gameProgress.totalQuiz === 1) {
                userScore.incorrectAnswer++
                gameProgress.playedQuiz++
                gameProgress.availableQuiz--
                gameProgress.currentQuiz++
                document.querySelectorAll('.game-progress div')[0].classList.add('incorrect')
                renderResult()
                goToResultScreen()
            } else {
                if ((gameProgress.availableQuiz < 2) && (gameProgress.availableQuiz <= gameProgress.playedQuiz)) {
                    document.querySelectorAll('.game-progress div')[gameProgress.currentQuiz].classList.add('incorrect')

                    userScore.incorrectAnswer++
                    gameProgress.playedQuiz++
                    gameProgress.availableQuiz--
                    renderResult()
                    goToResultScreen()
                } else {
                    userScore.incorrectAnswer++
                    document.querySelectorAll('.game-progress div')[gameProgress.currentQuiz].classList.add('incorrect')
                    gameProgress.playedQuiz++
                    gameProgress.availableQuiz--
                    document.querySelector('.skip-btn').innerHTML = "SKIP"
                    document.querySelector('.skip-btn').setAttribute('data-btn-role', 'skipQuiz')
                    gameProgress.currentQuiz++
                    renderQuiz(Quiz[gameProgress.currentQuiz])
                }
            }
        } else {
            renderResult()
            goToResultScreen()
        }
    })
}

async function playQuiz(count, category, level) {
    try {
        let apiLink = ''
        if (category === 8) {
            if (level === "none") {
                apiLink = `https://opentdb.com/api.php?amount=${count}`
            } else {
                apiLink = `https://opentdb.com/api.php?amount=${count}&difficulty=${level.toLowerCase()}`
            }

        } else {
            if (level === "none") {
                apiLink = `https://opentdb.com/api.php?amount=${count}&category=${category}`
            } else {
                apiLink = `https://opentdb.com/api.php?amount=${count}&category=${category}&difficulty=${level.toLowerCase()}`
            }
        }
        let response = await fetch(apiLink)
        if (response.status === 200) {
            let data = await response.json();
            return data;
        } else {
            return false
        }
    } catch (Error) {
        console.error(Error)
        return false
    }

}


async function renderUsers() {
    document.querySelector('.loader-quiz-screen').style.display = "flex"
    let datas = await playQuiz(quizInformation.numberQuiz, quizInformation.categoryQuiz, quizInformation.levelQuiz)
    if (datas !== false) {
        Quiz = datas.results
        gridProgressQuiz(Quiz.length)
        activeScreen(document.querySelectorAll('.screnn-app')[6])
        gameProgress.totalQuiz = Quiz.length
        gameProgress.currentQuiz = 0
        gameProgress.playedQuiz = 0
        gameProgress.availableQuiz = Quiz.length
        userScore.correctAnswer = 0
        userScore.incorrectAnswer = 0
        userScore.totalAnswer = Quiz.length
        indexQuiz = 1
        quizLabelChange(indexQuiz)
        renderQuiz(Quiz[0])


    } else {
        //error
        document.querySelector('.error-message').style.display = "flex";
        document.querySelector('.error-message').style.opacity = "1.0";
        let id = setTimeout(() => {
            document.querySelector('.error-message').style.opacity = "0";
            document.querySelector('.error-message').style.display = "none";
            clearTimeout(id)
        }, 3000)
    }
    document.querySelector('.loader-quiz-screen').style.display = "none"
}
const playGame = () => {
    document.querySelector('.start-btn').addEventListener('click', () => {
        renderUsers()
    })
    progressGame()
}
const replayGame = () => {
    document.querySelector('#try-btn').addEventListener('click', () => {

        restGame()
        renderUsers()
        //        renderUsers()
    })

}
