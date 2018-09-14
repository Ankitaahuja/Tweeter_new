var presentCharValue = 0;
const totalAllowedChar = 140;
var pendingCharCount = 0;



$(document).ready(function () {
  console.log("Hi, I am working Now!");

  $('.tweet-content').on('input', function () {
    presentCharValue = this.value.length; //The this keyword is a reference to the button
    pendingCharCount = totalAllowedChar - presentCharValue
    console.log(pendingCharCount);

    $(".counter").text(pendingCharCount);

    if (pendingCharCount < 0) {
      $(".counter").addClass("redColor");
      $(".new-tweet").addClass("pinkBackgroundColor");
    } else {
      $(".counter").removeClass("redColor");
      $(".new-tweet").removeClass("pinkBackgroundColor");
    }

  });

});