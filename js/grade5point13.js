$(document).ready(function () {

    // console.log("current platfrom: ", navigator.platform)

    if (navigator.platform === 'iPhone' || navigator.platform === 'iPad') {
        $('#iOS-retardation-meds').removeAttr('hidden')
    } else {
        $('#pdfWrap').removeAttr('hidden')
    }
    
})