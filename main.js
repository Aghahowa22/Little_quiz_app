const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Lion", correct: false},

        ]
    },

    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatician city", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},

        ]
    },

    {
        question: "Which is the largest Desert in the world?",
        answers: [
            {text: "Sahara", correct: false},
            {text: "Gobi", correct: false},
            {text: "Kalahari", correct: false},
            {text: "Antarctica", correct: true},

        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Africa", correct: false},
            {text: "Australia", correct: true},
            {text: "America", correct: false},

        ]
    },

];
const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer_button");
const nextBtn = document.getElementById("next_btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;

    nextBtn.innerHTML  = "Next";
    showQuestion();


}

function showQuestion(){

    resetState() 

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;



    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = answer.text;
        answerBtn.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        answerBtn.addEventListener("click", selectAnswer)

        
    });
}

function resetState() {
    nextBtn.style.display = "none"

    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Start again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }

});

startQuiz();