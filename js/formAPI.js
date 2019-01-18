
//const appEndPoint = 'https://script.google.com/'
//const scriptSelect = 'macros/s/AKfycbx7WoVPJ3GstcRImyFKyNdOx427Ob28Jj9h1ktDxhhbD4KRNIE/exec'

const scriptAccess = 'https://script.google.com/macros/s/AKfycbwWFdNbF32BeIjP1yxrEGuo3rNfFRU6xoVmuQHvekYwwl5SoNqW/exec'
const form = document.forms['postFormData']

form.addEventListener('submit', e => {

  e.preventDefault(); 

  $("#contactFormDiv").toggle();
  $("#contactFormProcessDiv").toggle();

  fetch(scriptAccess, {method:'POST', body: new FormData(form)})
  .then(function(response) {
    // console.log('Success!',response);
    $("#contactFormDiv").remove();
    $("#contactFormProcessDiv").toggle();
    $("#contactFormSuccessDiv").toggle();
  })
  .catch(function(error) {
    // console.error('Error!',error.message);
    $("#contactFormProcessDiv").toggle();
    $("#contactFormErrorDiv").toggle();
  })
})

// function setFormTime() {
//
//   // Generate current Date on function call:
//   const approxTime = new Date();
//
//   // Extract UTC time:
//   let utcTimeStr = "";
//
//   utcTimeStr += approxTime.getUTCHours().toString() + ":";
//   if (approxTime.getUTCMinutes().toString().length == 1) {
//     utcTimeStr += "0";
//   }
//   utcTimeStr += approxTime.getUTCMinutes().toString();
//
//   // UTC Time:
//   //console.log("UTC Time", utcTimeStr);
//   document.getElementById("formTime").value = utcTimeStr;
//
//   // Extract UTC Date:
//   let utcDateStr = approxTime.getUTCFullYear() + "/" + approxTime.getUTCMonth() + "/" + approxTime.getUTCDate();
//
//   // UTC Date:
//   //console.log("UTC Date", utcDateStr);
//   document.getElementById("formDate").value = utcDateStr;
//
//   setTimeout(function() {
//     setFormTime();
//   }, 120000); // Update form timeStamp every two minutes
//
// }
//
// $("document").ready( function() {
//   //console.log("formTimeStamp initilaized")
//   setFormTime(); // Call form timestamp function upon page initialize
// })
