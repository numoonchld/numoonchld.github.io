// BEGIN PORTFOLIO SCRIPT

// PORTFOLIO OBJECTS:=================================================
let folioElements = [
  {
    caption: "Calculator (JS App)",
    localAnim: "/media/portfolio/calculator.gif",
    imgAnim: new Image(),
    localStatic: "/media/portfolio/calculator.jpg",
    imgStat: new Image(),
    weblink: "https://codepen.io/numoonchld/pen/eMBaRp",
    hovertext: "click to see code"
  },

  {
    caption: "Galaxy Shooter (WebGL Game)",
    localAnim: "/media/portfolio/galaxyshooter.gif",
    imgAnim: new Image(),
    localStatic: "/media/portfolio/galaxyshooter.jpg",
    imgStat: new Image(),
    weblink: "/media/galaxy-shooter",
    hovertext: "click to play!!"
  },

  {
    caption: "Simon Game (JS Game)",
    localAnim: "/media/portfolio/simongame.gif",
    imgAnim: new Image(),
    localStatic: "/media/portfolio/simongame.jpg",
    imgStat: new Image(),
    weblink: "https://codepen.io/numoonchld/pen/EEQEop",
    hovertext: "click to see code"
  },

  {
    caption: "Wikipedia Search (using API)",
    localAnim: "/media/portfolio/wikisearch.gif",
    imgAnim: new Image(),
    localStatic: "/media/portfolio/wikisearch.jpg",
    imgStat: new Image(),
    weblink: "https://codepen.io/numoonchld/pen/GQPRaK",
    hovertext: "click to see code"
  },

  {
    caption: "Pomodoro Timer (JS App)",
    localAnim: "/media/portfolio/pomodoro.gif",
    imgAnim: new Image(),
    localStatic: "/media/portfolio/pomodoro.jpg",
    imgStat: new Image(),
    weblink: "https://codepen.io/numoonchld/pen/zWNMGw",
    hovertext: "click to see code"
  },

  {
    caption: "Quote Generator (using API)",
    localAnim: "/media/portfolio/randomquote.gif",
    imgAnim: new Image(),
    localStatic: "/media/portfolio/edgytwainquote.jpg",
    imgStat: new Image(),
    weblink: "https://codepen.io/numoonchld/pen/VQBqLm",
    hovertext: "click to see code"
  }

];

// index of currently displayed folio:
let scrollPos;

// static image preloading:
function folioPreload() {

  for (let count = 0; count < folioElements.length; count++) {
    folioElements[count].imgStat.src = folioElements[count].localStatic;
  }

  for (let count = 0; count < folioElements.length; count++) {
    folioElements[count].imgAnim.src = folioElements[count].localAnim;
  }

}

// PORTFOLIO FUNCTIONS ========================================================
// manage button function availability:
function buttonManage() {
  if (scrollPos == 0) {
    $("#leftScroll").prop("disabled", true);
    $("#rightScroll").prop("disabled", false);
  } else if (scrollPos == folioElements.length - 1) {
    $("#leftScroll").prop("disabled", false);
    $("#rightScroll").prop("disabled", true);
  } else {
    $("#leftScroll").prop("disabled", false);
    $("#rightScroll").prop("disabled", false);
  }
}

// display update function
function drawFolio() {

  

  if (folioElements[scrollPos].imgAnim.complete) {
    $("#folioDisp").attr("src", folioElements[scrollPos].localAnim);

    //$("#folioLoad").hide();

    //$("#folioDiv").show(250);

    $("#folioOverlay").html(folioElements[scrollPos].hovertext);
    $("#folioLink").attr("href", folioElements[scrollPos].weblink);

    buttonManage();
    $("#imgCaption").text(folioElements[scrollPos].caption);
  }
  else if (folioElements[scrollPos].imgStat.complete) {
    $("#folioDisp").attr("src", folioElements[scrollPos].localStatic);

    //$("#folioLoad").hide();

    //$("#folioDiv").show(250);

    $("#folioOverlay").html(folioElements[scrollPos].hovertext);
    $("#folioLink").attr("href", folioElements[scrollPos].weblink);


    buttonManage();
    $("#imgCaption").text(folioElements[scrollPos].caption);
  }
  else {
    //$("#folioDiv").hide();
    $("#imgCaption").html('<div> <i id="folioLoad" class="fas fa-circle-notch fa-spin fa-2x"></i> </div>');
    //$("#folioLoad").show();

    setTimeout(() => {
      drawFolio();
    }, 1000);
  }

}

// scroll functions
$("#leftScroll").on("click", function () {
  if (scrollPos > 0) {
    scrollPos--;
    drawFolio();
  }
})

$("#rightScroll").on("click", function () {
  if (scrollPos < folioElements.length) {
    scrollPos++;
    drawFolio();
  }
})

// PAGE INIT FUNCTION =========================================================
$("document").ready(function () {


  //console.log("jQuery script initialized");
  folioPreload();

  // Set first Portfolio Display Object index and draw portfolio:
  scrollPos = 0;
  drawFolio();

});
