const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
console.log(choices);

let currentQuestion = {}; //object
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = []; //array

let questions = [
    {
        question: "What is 'cat' in spanish?",
        choice1: "perro",
        choice2: "gato",
        answer: 2
    },
    {
        question: "What is 'rat' in spanish?",
        choice1: "rata",
        choice2: "ratón",
        answer: 1
    },
    {
        question: "What is 'mouse' in spanish?",
        choice1: "rata",
        choice2: "ratón",
        answer: 2
    }
];

/* CONSTANTS */

const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        return window.location.assign('/end.html');
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1); //remove the question

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        //console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedAnswer);
        getNewQuestion();
    });
})

startGame();