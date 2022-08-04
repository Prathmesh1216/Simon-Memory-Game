var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var b = true;
$(document).keypress(function() {
  if (b) {
    $("#level-title").text("Level " + level);
    nextSequence();
    b=false;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  // console.log(gamePattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animate(randomChosenColour);
  playSound(randomChosenColour);
}

function animate(randomChosenColour) {
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}



function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed")
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(curentLevel) {
  if (userClickedPattern[curentLevel] === gamePattern[curentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 250);

    gamePattern = [];
    level = 0;
    b = true;
  }
}
