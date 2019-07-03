$("document").ready(function () {

    

    $("#hide-chrono-show-tags").click(function () {

        $("#chrono-list").css("display", "none") 
        $("#tag-group").css("display", "block")
    })

    $("#hide-tags-show-chrono").click(function () {

        $("#chrono-list").css("display", "block") 
        $("#tag-group").css("display", "none")
        
    })

})