const question = document.getElementById('question');
const form = document.getElementById('myForm'); 

let currentQuestion = {}; //object
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuestions = []; 

let questions = [
    {
        question: "What is 'cat' in spanish?",
        word: "gato"
    },
    {
        question: "What is 'rat' in spanish?",
        word: "rata"
    }
];

/* CONSTANTS */

const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        return window.location.assign('/index.html'); //TODO: create 'end' page
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    availableQuestions.splice(questionIndex, 1); //TODO only remove question if it has class 'correct'

    acceptingAnswers = true;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    let answer = form["input_word"].value;

    let classToApply = 'incorrect';
    if(answer == currentQuestion.word){
        classToApply = 'correct'
    }

    e.target.classList.add(classToApply);

    setTimeout(() => {
        e.target.classList.remove(classToApply);
        getNewQuestion(); 
    }, 1000);

});

startGame();