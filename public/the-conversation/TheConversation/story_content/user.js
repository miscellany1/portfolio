window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  var player = GetPlayer();
var score = player.GetVar("score");
var dp1 = player.GetVar("dp1_choice");
var dp2 = player.GetVar("dp2_choice");
var dp3 = player.GetVar("dp3_choice");
var dp4 = player.GetVar("dp4_choice");

window.open(
  "https://liamksheehan.com/the-conversation/results" +
  "?score=" + score +
  "&dp1=" + dp1 +
  "&dp2=" + dp2 +
  "&dp3=" + dp3 +
  "&dp4=" + dp4,
  "_blank"
);
}

};
