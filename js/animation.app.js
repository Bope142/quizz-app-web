const deselectCategoryUI = () => {
    document.querySelectorAll('.category').forEach(category => category.classList.remove('category-select'))
    quizInformation.categoryQuiz = 0
}

const selectCategoryUI = () => {
    document.querySelectorAll('.category').forEach((category, index) => {
        category.addEventListener('click', () => {
            if (category.classList.contains('category-select')) {
                category.classList.remove('category-select')
                quizInformation.categoryQuiz = 0
            } else {
                deselectCategoryUI()
                category.classList.add('category-select')
                quizInformation.categoryQuiz = parseInt(category.getAttribute('data-category-id'))

                document.querySelector('#level-screen .content-prev-choice .choice .value').innerHTML = document.querySelectorAll('.category .category-name')[index].innerHTML;
                document.querySelectorAll('#number-screen .content-prev-choice .choice .value')[0].innerHTML = document.querySelectorAll('.category .category-name')[index].innerHTML;
                document.querySelectorAll('#resume-screen .content-prev-choice .choice .value')[0].innerHTML = document.querySelectorAll('.category .category-name')[index].innerHTML;

            }
        })
    })
}

const deselectLevelUI = () => {
    document.querySelectorAll('.level').forEach(level => level.classList.remove('level-select'))
    quizInformation.levelQuiz = ''
}

const selectLevelUI = () => {
    document.querySelectorAll('.level').forEach((level, index) => {
        level.addEventListener('click', () => {
            if (level.classList.contains('level-select')) {
                level.classList.remove('level-select')
                quizInformation.levelQuiz = ''
            } else {
                deselectLevelUI()
                level.classList.add('level-select')
                quizInformation.levelQuiz = level.getAttribute('data-level-name')
                document.querySelectorAll('#number-screen .content-prev-choice .choice .value')[1].innerHTML = document.querySelectorAll('.level')[index].innerHTML;
                document.querySelectorAll('#resume-screen .content-prev-choice .choice .value')[1].innerHTML = document.querySelectorAll('.level')[index].innerHTML;
            }
        })
    })
}

const animationEvent = () => {
    selectCategoryUI()
    selectLevelUI()
}
