//question tracking
//timer

var quizHeaderEl = document.querySelector(".quiz-header");
var quizContentEl = document.querySelector(".quiz-content");
var quizFooterEl = document.querySelector(".quiz-footer");
var highScoreEl = document.querySelector(".high-score");
var timerEl = document.querySelector(".timer");

var timer = 75;


var countDown = function () {
    if (timer > 0) {
        timer--;
        timerEl.textContent = timer;
        console.log(timer);
    }
    else {
        console.log("ran out of time");
        clearInterval();
        return
    }
};


var questionObj = [
    { //object contains the question, the index of the answer from choices, will give an Id to each choice associated to its position within the array.
        question: "Arrays in JavaScript can be used to store ____",
        answer: 2,
        choice: ["numbers and strings", "2", "3", "4"]
    },
    {
        question: "Commonly used data types",
        answer: 2,
        choice: ["1", "2", "3", "4"]
    },
    {
        question: "This is a question",
        answer: 2,
        choice: ["1", "2", "3", "4"]
    }
];

//build question function
//will leverage the various
var quizContentHandler = function () {
    
};

var setQuizHeader = function (content) {

};

var setQuizFooter = function (content) {

};

var setQuizContent = function (element) {

};

var buildHighScores = function (hsArray) {
    
};

var buildQuizChoices = function (choiceArray) {
    var listEL = document.createElement("ol");
    
    for (var i = 0; i < choiceArray.length; i++){
        var listItemEl = document.createElement("li");
        listItemEl.className = "button";
        listItemEl.setAttribute("data-answer-id", i);
        listItemEl.textContent = choiceArray[i];
        console.log(listItemEl);
        listEL.appendChild(listItemEl);
    }
    console.log(listEL);
    //need to make a best decision on how I want to return it
    return quizContentEl.replaceChild(listEL);
};

var resetGame = function () { //resets page to default screen
    
};

var clearHighScores = function () {
    localStorage.removeItem("high-scores");
};

var setHighScore = function () {
    
};














///////////////////////////////////
//Add listener for the main area
//setInterval(countDown, 1000);
quizContentEl.addEventListener("click", quizContentHandler);
highScoreEl.addEventListener("click", quizContentHandler);
