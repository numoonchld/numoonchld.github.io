$(document).ready(function () { 

    // console.log("current platfrom: ", navigator.platform)

    if (navigator.platform === 'iPhone' || navigator.platform === 'iPad') {
        $('#pdfWrap').hide()
    } else { 
        $('#iOS-retardation-meds').hide()
    }



})