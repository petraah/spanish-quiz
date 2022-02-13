const question_text = document.getElementById('question');
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
    question_text.innerText = currentQuestion.question;

    acceptingAnswers = true;
}

getSameQuestion = () => {
    form.reset();
    acceptingAnswers = true;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    let answer = form["input_word"].value;

    if(answer == currentQuestion.word){
        let classToApply = 'correct'
        e.target.classList.add(classToApply);
        availableQuestions.splice(questionIndex, 1);

        setTimeout(() => {
            e.target.classList.remove(classToApply);
            getNewQuestion(); 
        }, 1000);
    } else {
        let classToApply = 'incorrect';
        e.target.classList.add(classToApply);

        setTimeout(() => {
            e.target.classList.remove(classToApply);
            question_text.innerText = currentQuestion.question + " = " + currentQuestion.word;
            getSameQuestion(); 
        }, 1000);
    }

});

startGame();