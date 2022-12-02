const activeScreen = (screen) => {
    document.querySelectorAll('.screnn-app').forEach(scr => scr.classList.replace('active-screen', 'hide-screen'))
    screen.classList.replace('hide-screen', 'active-screen')
}

const goToCategoryScreen = () => {
    document.querySelector('#play-btn').addEventListener('click', () => {

        activeScreen(document.querySelectorAll('.screnn-app')[2])

    })
    document.querySelector('#category-screen .btn-back').addEventListener('click', () => {
        activeScreen(document.querySelectorAll('.screnn-app')[1])
    })
}

const goToLevelScreen = () => {
    document.querySelector('#category-screen .nav-bar .next-btn').addEventListener('click', () => {
        if (quizInformation.categoryQuiz > 0) {
            activeScreen(document.querySelectorAll('.screnn-app')[3])
        }
    })
    document.querySelector('#level-screen .btn-back').addEventListener('click', () => {
        activeScreen(document.querySelectorAll('.screnn-app')[2])
    })
}

const goToNumberScreen = () => {
    document.querySelector('#level-screen .nav-bar .next-btn').addEventListener('click', () => {
        if (quizInformation.levelQuiz !== '') {
            activeScreen(document.querySelectorAll('.screnn-app')[4])
        }

    })
    document.querySelector('#number-screen .btn-back').addEventListener('click', () => {
        activeScreen(document.querySelectorAll('.screnn-app')[3])
    })
}

const goToResumeScreen = () => {
    document.querySelector('#number-screen .nav-bar .next-btn').addEventListener('click', () => {
        if (quizInformation.numberQuiz > 0) {
            activeScreen(document.querySelectorAll('.screnn-app')[5])
        }

    })
    document.querySelector('#resume-screen .btn-back').addEventListener('click', () => {
        activeScreen(document.querySelectorAll('.screnn-app')[4])
    })
}
const goToPlayingScreen = () => {
    document.querySelector('#resume-screen .nav-bar .start-btn').addEventListener('click', () => {
        activeScreen(document.querySelectorAll('.screnn-app')[6])
    })
}

const goToResultScreen = () => {
    activeScreen(document.querySelectorAll('.screnn-app')[7])
}

const goToHomeScreen = () => {
    document.querySelector('#exit-btn').addEventListener('click', () => {
        restGame()
        activeScreen(document.querySelectorAll('.screnn-app')[1])
    })
}
const goToAboutScreen = () => {
    document.querySelector('#about-btn').addEventListener('click', () => {

        activeScreen(document.querySelectorAll('.screnn-app')[8])

    })
    document.querySelector('#about-screen .btn-back').addEventListener('click', () => {
        activeScreen(document.querySelectorAll('.screnn-app')[1])
    })
}
const goToLeaveScreen = () => {
    document.querySelector('#leaveBtn').addEventListener('click', () => {
        document.querySelector('.leave-screen ').style.display = "flex"
    })
    document.querySelector('#no-btn').addEventListener('click', () => {
        document.querySelector('.leave-screen ').style.display = "none"
    })
    document.querySelector('#yes-btn').addEventListener('click', () => {
        document.querySelector('.leave-screen ').style.display = "none"
        stopTimer()
        document.querySelector('#exit-btn').click()
    })
}
const navigationScreen = () => {
    goToCategoryScreen()
    goToLevelScreen()
    goToNumberScreen()
    goToResumeScreen()
    goToHomeScreen()
    goToAboutScreen()
}
