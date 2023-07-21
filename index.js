var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var chosenPattern = [];

var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + (gamePattern.length + 1));
    nextSeq();
    started = true;
  }
});

$(".btn").click(function () {
  var currentColor = $(this).attr("id");
  chosenPattern.push(currentColor);

  playSound(currentColor);
  animatePress(currentColor);

  check(chosenPattern.length - 1);
});

function check(level) {
  if (gamePattern[level] === chosenPattern[level]) {
    if (chosenPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSeq();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSeq() {
  chosenPattern = [];
  $("#level-title").text("Level " + gamePattern.length);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
