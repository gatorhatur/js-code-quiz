//question tracking
//timer

var quizHeaderEl = document.querySelector(".quiz-header");
var quizContentEl = document.querySelector(".quiz-content");
var quizFooterEl = document.querySelector("footer");
var highScoreEl = document.querySelector(".high-score");
var timerEl = document.querySelector(".timer");

var timer = 75;
var currentQuestion = 0;
var timeout;

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

var countDown = function () {
    if (timer > 0) {
        timer--;
        timerEl.textContent = timer;
        timeout = setTimeout(countDown, 1000);
        //console.log(timer);
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
        var initialInput = document.querySelector("input[name='initials']").value;
        setHighScore(timer, initialInput);
        return;
    }
    else if (event.target.getAttribute("id") === "back") {
        //reset game
        resetGame();
        return;
    }
    else if (event.target.getAttribute("id") === "clear") {
        clearHighScores();
        resetGame();
        return;
    }
    else if (event.target.className === "high-score") {
        buildHighScores();
        return;
    }

    var correct = parseInt(event.target.getAttribute("data-answer-id")) === questionBankObj[currentQuestion].answer
    if (correct) {
        console.log("correct");
        setQuizFooter("Correct!");
    }
    else {
        console.log("wrong!");
        setQuizFooter("Incorrect!");
        if (timer - 10 > 0) {
            timer -= 10;
        }
        else {
            timer = 0;
        }
        
    }

    currentQuestion++;
    //check if we finished our last question and move on to the end
    if (currentQuestion >= questionBankObj.length) {
        console.log("out questions!");
        clearTimeout(timeout);
        timerEl.textContent = timer;
        //end game summary
        setTimeout(setQuizFooter, 1500,"clear");
        buildScoreSubmit();
        
    }
    else {
        //next question
        buildQuestion(questionBankObj[currentQuestion]);
        return
    }
    
};

var setQuizHeader = function (content) {
    console.log(content);
    quizHeaderEl.innerHTML = content;
};

var setQuizFooter = function (content) {
    if (content === "clear") {
        quizFooterEl.remove();
        return;
    }
    var footerContentEl = document.createElement("h2");
    footerContentEl.className = "quiz-footer"
    footerContentEl.textContent = content;
    quizFooterEl.replaceChildren(footerContentEl);
    
};

var setQuizContent = function (element) {
    quizContentEl.replaceChildren(element);
};

var buildHighScores = function (hsArray) {

    if (!hsArray) {
        var score = localStorage.getItem("high-scores");
        hsArray = JSON.parse(score);
    }

    setQuizHeader("High Scores");
    var scoreOlEl = document.createElement("ol");
    scoreOlEl.className = "hs-table";
    for (var i = 0; i < hsArray.length; i++){
        console.log(hsArray[i]);
        var scoreLiEl = document.createElement("li");
        scoreLiEl.className = "hs-entry";
        scoreLiEl.textContent = hsArray[i].initials + " - " + hsArray[i].score;
        scoreOlEl.appendChild(scoreLiEl);
    }
    quizContentEl.replaceChildren(scoreOlEl);
    //create buttons and deploy after list
    //create restart button
    var backButtonEl = document.createElement("button");
    backButtonEl.className = "button";
    backButtonEl.setAttribute("id", "back");
    backButtonEl.textContent = "Go back";
    quizContentEl.appendChild(backButtonEl);
    //create clear high scores button
    var clearButtonEl = document.createElement("button");
    clearButtonEl.className = "button";
    clearButtonEl.setAttribute("id", "clear");
    clearButtonEl.textContent = "Clear high scores";
    quizContentEl.appendChild(clearButtonEl);
};

var buildScoreSubmit = function () {
    setQuizHeader("All Done!<p>Your final score is " + timer + ".");
    var formEl = document.createElement("form");
    var divEl = document.createElement("div");
    divEl.className = "score-form";
    //create input form and add to content area
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "initials");
    inputEl.setAttribute("placeholder", "Enter Initials");
    inputEl.setAttribute("style", "margin-right:10px;font-size:24px;padding:10px");
    divEl.appendChild(inputEl);
    //create submit button and content area
    var buttonEl = document.createElement("button");
    buttonEl.className = "button";
    buttonEl.setAttribute("id", "submit");
    buttonEl.textContent = "Submit";
    divEl.appendChild(buttonEl);

    setQuizContent(divEl);
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

var resetGame = function () {//resets page to default screen
    currentQuestion = 0;
    timer = 75; 
    timerEl.textContent = timer;
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

//ISSUE -- refactor to make the scoreObj global
var setHighScore = function (highScore, initial) {
    var score = localStorage.getItem("high-scores");
    console.log(score);
    if (!score) {
        var scoreObj = [{score:highScore,initials:initial}]
        console.log(scoreObj);
        localStorage.setItem("high-scores", JSON.stringify(scoreObj));
        return buildHighScores(scoreObj);
    }

    var scoreObj = JSON.parse(score);
    console.log(scoreObj);
    for (var i = 0; i < scoreObj.length; i++){
        console.log(scoreObj[i].score);
        if (parseInt(highScore) >= parseInt(scoreObj[i].score)) {
            var Obj = [{ score: highScore, initials: initial }];
            scoreObj.splice(i, 0, Obj[0]);
            break;
        }

        if (i === scoreObj.length - 1) { //catches lowest score
            var Obj = [{ score: highScore, initials: initial }];
            scoreObj.push(Obj[0]);
        }
    }

    if (scoreObj.length > 10) {
        //only want to keep the to 10 scores
        console.log("popped array");
        scoreObj.pop();
    }
    console.log(scoreObj);

    localStorage.setItem("high-scores", JSON.stringify(scoreObj)); 
    //pass the object in the scope of the set high scores so we can save code on loading the data from
    //memory again
    buildHighScores(scoreObj);
};

///////////////////////////////////
//Add listener for the main area
//setInterval(countDown, 1000);
resetGame();
highScoreEl.addEventListener("click", quizContentHandler);
quizContentEl.addEventListener("click", quizContentHandler);

