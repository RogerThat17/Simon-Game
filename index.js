//alert("Hello from java script");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//Handling the keypress
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level "+ level);
        $("#score-title").css("visibility", "hidden");
        nextSequence();
        started = true;
    }
});

//Handling button click
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


//Sequence generator logic
function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

//Check the Sequence
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("Success");

        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#score-title").css("visibility", "visible").text("HIGH SCORE 000"+ level);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


//Play a mp3 file
function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}


//Button Animation
function animatePress(currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
