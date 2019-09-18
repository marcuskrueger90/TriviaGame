var counter = 30;
var currentQuestion = 0;
var score = 0;
var lose = 0;
var timer;

function nextQuestion(){
var noQuestions = (arsenalQuestion.length - 1) === currentQuestion;
    if(noQuestions){
        
        gameResult();
    }else {
    currentQuestion++;
    viewQuestion();
    }
}


function timesUp(){
    clearInterval(timer);
    lose++;
    loadImage('loss');
    setTimeout(nextQuestion, 3000);
}
function countDown(){
    counter--;
    $('#timer').html('Time Remaining: '+ counter);

    if(counter===0){
        timesUp();
    }
}
function viewQuestion(){
    counter =30;
    timer = setInterval(countDown, 1000);

    var questions = arsenalQuestion[currentQuestion].question;
    var choices = arsenalQuestion[currentQuestion].choices;

    $("#timer").html("Time Remaining: " + counter);

    $("#theGame").html("<h4>"+ questions + "</h4>" + viewChoices(choices));
}

function viewChoices(choices){
    var result = "";

    for (var i = 0; i < choices.length; i++){
        result += `<p class="choice" data-answer= "${choices[i]}"> ${choices[i]}</p>`;
    }

    return result;
}

$(document).on('click','.choice', function(){
    clearInterval(timer);
    var selectedAnswer = $(this).attr('data-answer');
    
    var correctAnswer = arsenalQuestion[currentQuestion].correctAnswer;
    if(correctAnswer===selectedAnswer){
        score++;
        loadImage('win');
        setTimeout(nextQuestion, 3000);
        }else{
        lose++;
        loadImage('loss');
        setTimeout(nextQuestion, 3000);    }
});
function gameResult(){
    $("#theGame").html("<p> You got "+ score + "question(s) out of " + arsenalQuestion.length + "correct! </p>"+"<p> You got "+ lose + "question(s) wrong </p>" + "<button class= 'btn btn-primary' id= 'restart'> Restart Game </button>")
}
$(document).on('click', '#restart', function(){
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lose = 0;
    timer=null;

    viewQuestion();

});
function randomImage(images){
    var random= Math.floor(Math.random() * images.length);
    var randomImage = images[random];
    return randomImage;
};

function loadImage(status){
    var rightAnswer = arsenalQuestion[currentQuestion].correctAnswer

    if(status==='win'){
        $('#theGame').html(`<p class= "preload-image">NICE</p> <img src ="${randomImage(correctImages)}"/>`);
    } else {
        $('#theGame').html(`<p class= "preload-image">LAME!</p> <img src ="${randomImage(wrongImages)}"/>`);
    }
}


$('#start').on('click', function(){
    $('#start').remove();
    $('#timer').html(counter);
    viewQuestion();
})