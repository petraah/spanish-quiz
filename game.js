const question = document.getElementById('question');
const form = document.getElementById('myForm'); 

let currentQuestion = {}; //object
let acceptingAnswers = false;
let questionCounter = 0;
let questionIndex = 0;
let availableQuestions = []; 

/* CONSTANTS */
const MAX_QUESTIONS = 20;

let questions = [];
let keys = Object.keys(localStorage);
for(let key of keys) { //TODO: Make this operation asynchronous? 
    var obj = JSON.parse(window.localStorage.getItem(key));
    questions.push(obj);
}

startGame = () => {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    form.reset();
    
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        return window.location.assign('/index.html');
    }

    questionCounter++;
    questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = "What is '" + currentQuestion.question + "' in spanish?";

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
        availableQuestions.splice(questionIndex, 1);
    }

    e.target.classList.add(classToApply);

    setTimeout(() => {
        e.target.classList.remove(classToApply);
        getNewQuestion(); 
    }, 1000);

});

startGame();