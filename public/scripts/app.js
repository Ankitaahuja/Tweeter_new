function convertTimeToString(time) {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(time / cd),
    h = Math.floor((time - d * cd) / ch),
    m = Math.round((time - d * cd - h * ch) / 60000),
    pad = function (n) {
      return n < 10 ? '0' + n : n;
    };
  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return d + " days ago";
};

function renderTweets(tweets) {
  tweets.sort((a, b) => b.created_at - a.created_at);
  for (let tweet of tweets) {
    var currentTime = Date.now();
    var tweetTime = tweet.created_at;
    var displayTime = currentTime - tweetTime;

    let $eachTweet = createTweetElement(tweet, convertTimeToString(displayTime));
    $('#tweets-container').append($eachTweet);

    // loops through tweets, calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
}

function createTweetElement(tweet, displayTime) { //create each tweet and its structure(HTML)
  let username = tweet.user.name;
  let handle = tweet.user.handle;
  let profileImg = tweet.user.avatars.small;
  let tweetContent = tweet.content.text;
  let Id = tweet._id;

  var $tweet = $("<article>").addClass("tweet").attr('id', Id)
    .append($("<header>").addClass("tweet-header")
      .append($("<img>").addClass("profile-img").attr("src", profileImg))
      .append($("<h2>").addClass("user-name").text(username))
      .append($("<h4>").text(handle))
    )
    .append($("<div>").addClass("tweet-text")
      .append($("<p>").text(tweetContent))
    ) // .text also helps to escapes unsafe characters by literally converting it into string, so it is safe to use with untrusted text. 
    .append($("<div>").addClass("icons")
      .append($('<i class="fas fa-flag">'))
      .append($('<i class="fas fa-retweet">'))
      .append($('<i class="fas fa-heart">'))
    )
    .append($("<footer>").addClass("tweet-footer").text(displayTime))
  return $tweet;
}

$(document).ready(function () {

  $(".new-tweet form").on("submit", function (ev) {
    ev.preventDefault();
    if ($(".tweet-content").val().length > 140) {
      $(".error-message").text("Exceed the maximum word limit!").slideDown();
    } else if ($(".tweet-content").val().length == 0) {
      $(".error-message").text("Tweet cannot be empty!").slideDown();
    } else {
      $.ajax({
        url: "/tweets", //post all the new tweets in the path
        method: "POST",
        data: $(this).serialize()
      }).then(function () {
        loadTweets()
        $(".tweet-content").val("");
      })
    }
  })


  loadTweets();

  function loadTweets() {
    $('.tweet').remove(); //remove the old tweets from the data to avoid the repetition. 
    $.ajax({
      url: "/tweets", //will show all the tweets to this path
      method: "GET"
    }).then(function (tweets) { //save all the tweets and send this tweets when the renderTweets is called
      renderTweets(tweets)
    })
  }

  $(".compose-button").click(function () {
    $(".new-tweet").slideToggle("slow", function () {
      $(".new-tweet textarea").focus();
    });
  });
  $(".tweet-button").click(function () {
    $(".error-message").hide();
  });
});