//question tracking
//timer

console.log("I am working");
var quizHeaderEl = document.querySelector(".quiz-header");
var quizContentEl = document.querySelector(".quiz-content");
var quizFooterEl = document.querySelector(".quiz-footer");
var highScoreEl = document.querySelector(".high-score");

var questionObj = [
    { //object contains the question, the index of the answer from choices, will give an Id to each choice associated to its position within the array.
        question: "This is a question",
        answer: 2,
        choice: ["1", "2", "3", "4"]
    },
    {
        question: "This is a question",
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














///////////////////////////////////
//Add listener for the main area
quizContentEl.addEventListener("click", quizContentHandler);
highScoreEl.addEventListener("click", quizContentHandler);
