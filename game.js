const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const form = document.getElementById('myForm'); //TODO change name to input

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
        answer: 2,
        word: "gato"
    },
    {
        question: "What is 'rat' in spanish?",
        choice1: "rata",
        choice2: "ratón",
        answer: 1,
        word: "rata"
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
        return window.location.assign('/index.html'); // go to end page
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1); //remove the question from list of available questions 

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
    
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']; //selected number

        let classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer){
            classToApply = 'correct'
        }

        selectedChoice.parentElement.classList.add(classToApply); //'this is how you apply classes in js'

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply); 
            getNewQuestion();
        }, 1000);
    });
})

form.addEventListener('submit', e => {
    //alert(acceptingAnswers); TODO: Undersök varför detta alltid verkar vara true, och om det är ett problem 
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    let answer = form["input_word"].value;
    let correct = answer == currentQuestion.word;
    alert(correct); // TODO make fansier display of correctness
    //TODO remove question if answered correctly

    setTimeout( () => {
        getNewQuestion();
    }, 1000);

});

startGame();