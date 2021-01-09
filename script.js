const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const timeEl = document.getElementById("time");

let shuffledQuestions, currentQuestionIndex

function setTime() {
    const timeEl = document.getElementById("time")
    secondsLeft = 60
    const timerInterval = setInterval(function() {
    secondsLeft--
    timeEl.textContent = secondsLeft
    

    if(secondsLeft === 0) {
      clearInterval(timerInterval)
      showScore();
    }

  }, 1000);
}

  
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})
function startGame() {
    setTime()
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = (question.question)
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }   
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct") 
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
element.classList.remove("correct")
element.classList.remove("wrong")
}

const questions = [

    {
        question: "All You Need is ____.",
        answers: [
            { text: "Love", correct: true},
            { text: "Fiber", correct: false},
            { text: "Cash", correct: false},
            { text: "Netflix", correct: false}
        ]
        
    },
    {   
        question: "Fight For Your ____ To Party.",
        answers: [
            { text: "Life", correct: false},
            { text: "Right", correct: true},
            { text: "House", correct: false},
            { text: "Pets", correct: false}
        ]
    },    
    {   
        question: "Now, I ain't sayin' she a ____ ____.",
        answers: [
            { text: "Life Partner", correct: false},
            { text: "Happy Camper", correct: false},
            { text: "Gold Digger", correct: true},
            { text: "Life Guard", correct: false}
        ]
    },
    {   
        question: "I love it when you call me ___ ___.",
        answers: [
            { text: "Love Doctor", correct: false},
            { text: "Gold Digger", correct: false},
            { text: "John Doe", correct: false},
            { text: "Big Poppa", correct: true}
        ]
    }    

]

// Function to create and append score to score.html
var storedScores = JSON.parse(localStorage.getItem("userData"));
var highScoresArea = document.querySelector("#highScoresList");
var backBtn = document.querySelector("#backButton");
var clearBtn = document.querySelector("#clearScores");


function displayScores() {
    if (storedScores !== null) {
        var scoreList = document.createElement("ol");
        scoreList.className = "scoreListClass";
        for (var i = 0; i < storedScores.length; i++) {
            var initials = storedScores[i].inits;
            var scores = storedScores[i].userScore
            var scoreEntry = document.createElement("li");
            scoreEntry.innerHTML = initials + " - " + scores;
            scoreList.appendChild(scoreEntry);
        }
        highScoresArea.appendChild(scoreList);
    }
};

displayScores();

backBtn.addEventListener("click", function () {
    location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
    highScoresArea.innerHTML = "";
    window.localStorage.clear();

});
