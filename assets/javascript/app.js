var counter = 30;
var currentQuestion = 0;
var score = 0;
var lose = 0;
var timer;

function viewQuestion(){
    var questions = arsenalQuestion[currentQuestion].question;
    var choices = arsenalQuestion[currentQuestion].choices;

    $("#timer").html("Time Remaining: " + counter);

    $("#theGame").html("<h4>"+ questions + "</h4>" + viewChoices(choices));
}

function viewChoices(choices){
    var result = "";

    for (var i = 0; i < choices.length; i++){
        result += "<p class='choice' data-answer= '${choices[i]}'>${choices[i]}</p>";
    }

    return result;
}
viewQuestion();