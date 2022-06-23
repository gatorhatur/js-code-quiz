//question tracking
//timer

var quizHeaderEl = document.querySelector(".quiz-header");
var quizContentEl = document.querySelector(".quiz-content");
var quizFooterEl = document.querySelector(".quiz-footer");
var highScoreEl = document.querySelector(".high-score");
var timerEl = document.querySelector(".timer");

var timer = 75;



var questionBankObj = [
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

var currentQuestion = 0;
var timeout;

var countDown = function () {
    if (timer > 0) {
        timer--;
        timerEl.textContent = timer;
        timeout = setTimeout(countDown, 1000);
        console.log(timer);
    }
    else {
        console.log("ran out of time");
        clearTimeout(timeout);
    }
};

//build question function
//will leverage the various
var quizContentHandler = function (event) {
    console.log(event.target);
    if (event.target.getAttribute("id") === "start") {
        console.log(true);
        //start timer
        countDown();
        //load first question
        buildQuestion(questionBankObj[currentQuestion]);
        return;
    }
    else if (event.target.getAttribute("id") === "submit") {
        //update high scores
        return;
    }
    else if (event.target.getAttribute("id") === "back") {
        //reset game
    }
    else if (event.target.getAttribute("id") === "clear") {
        clearHighScores();
    }

    var correct = parseInt(event.target.getAttribute("data-answer-id")) === questionBankObj[currentQuestion].answer
    if (correct) {
        console.log("correct");
        setQuizFooter("Correct!");
    }
    else {
        console.log("wrong!");
        setQuizFooter("Incorrect!");
        timer -= 10;
    }

    currentQuestion++;
    //check if we finished our last question and move on to the end
    if (currentQuestion >= questionBankObj.length) {
        console.log("out questions!");
        clearTimeout(timeout);
        //end game summary
    }
    else {
        //next question
        buildQuestion(questionBankObj[currentQuestion]);
    }
    
};

var setQuizHeader = function (content) {
    console.log(content);
    quizHeaderEl.innerHTML = content;
};

var setQuizFooter = function (content) {
    quizFooterEl.textContent = content;
};

var setQuizContent = function (element) {
    quizContentEl.replaceChildren(element);
};

var buildHighScores = function (hsArray) {
    
};

var buildQuestion = function (questionObj) {
    console.log(questionObj.question);
    setQuizHeader(questionObj.question);
    buildQuizChoices(questionObj.choice);
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
    setQuizContent(listEL);
};

var resetGame = function () { //resets page to default screen
    setQuizHeader("Coding Quiz Challenge<p style='font-size:20px'>Try to answer the following code related questions within the time limit. Keep in mind incorrect answers will penalized your score/time by 10 seconds");
    startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "button";
    startButtonEl.setAttribute("id", "start");
    setQuizContent(startButtonEl);
};

var clearHighScores = function () {
    confirm = window.confirm("Are you sure you want to reset the high scores?")

    if (confirm) {
        localStorage.removeItem("high-scores");
        window.alert("High Scores have been reset!")
    }
};

var setHighScore = function (highScore,initial) {
    var score = localStorage.getItem("high-scores");
    if (!score) {
        localStorage.setItem("high-scores", [highScore,initial]);
        return;
    }

    score = JSON.parse(score);
    //will need to travers the array and put them in order by score
};

///////////////////////////////////
//Add listener for the main area
//setInterval(countDown, 1000);
resetGame();
quizContentEl.addEventListener("click", quizContentHandler);
highScoreEl.addEventListener("click", quizContentHandler);
