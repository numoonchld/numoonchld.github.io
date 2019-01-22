// PAGE INIT FUNCTION =========================================================
$("document").ready(function () {

    // Enable BootStrap tooltips:
    $('[data-toggle="tooltip"]').tooltip();

    // try speeding up default tooltip
    $(".icon").tooltip({
        show: { delay: 50 }
    });

})