let divIds = {
    1: 'about',
    2: 'portfolio',
    3: 'contact'
}

var currSlidePos;

var coolDown = false; // flag for time gap for which scrolling is disabled 
const coolDownCal = 1500; // ms

function slideHandle() {

    // Wheel Events 
    document.body.addEventListener('wheel', function (event) {

        event.preventDefault();

        if (event.deltaY > 0 && currSlidePos < 3 && coolDown == false) {

            // console.log("DOWN - NEXT DIV");

            coolDown = true; // scrolling is disabled 


            $(divIds[currSlidePos]).css("opacity", "0.01");

            currSlidePos++; // Scroll to target slide
            // console.log(currSlidePos);

            document.getElementById(divIds[currSlidePos]).scrollIntoView(true);
            

            // 
            setTimeout(function () {
                coolDown = false; // scrolling is re-enabled 
            }, coolDownCal);

        }

        else if (event.deltaY < 0 && currSlidePos > 1 && coolDown == false) {

            // console.log("UP - PREV DIV");

            coolDown = true; // scrolling is disabled 

            $(divIds[currSlidePos]).css("opacity", "0.01");
            currSlidePos--;
            // console.log(currSlidePos);

            document.getElementById(divIds[currSlidePos]).scrollIntoView(true);
            


            setTimeout(function () {
                coolDown = false; // scrolling is re-enabled 
            }, coolDownCal);
        }

    })



    // Keyboard Events


    // TouchScreen Events
}


// PAGE INIT FUNCTION =========================================================
$("document").ready(function () {

    // initialize Current Div
    currSlidePos = 1;
    document.getElementById(divIds[currSlidePos]).scrollIntoView(true);
    slideHandle();

    // Enable BootStrap tooltips:
    $('[data-toggle="tooltip"]').tooltip();

    // try speeding up default tooltip
    $(".icon").tooltip({
        show: { delay: 50 }
    });

})