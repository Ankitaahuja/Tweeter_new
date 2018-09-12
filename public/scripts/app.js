/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function convertTimeToString(time){
  var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(time / cd),
      h = Math.floor( (time - d * cd) / ch),
      m = Math.round( (time - d * cd - h * ch) / 60000),
      pad = function(n){ return n < 10 ? '0' + n : n; };
if( m === 60 ){
  h++;
  m = 0;
} 
if( h === 24 ){
  d++;
  h = 0;
}
return d +" days ago";
};

 $(document).ready(function() {

    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": {
              "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
              "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
              "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": {
              "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
              "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
              "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        },
        {
          "user": {
            "name": "Johann von Goethe",
            "avatars": {
              "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
              "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
              "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            "handle": "@johann49"
          },
          "content": {
            "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
          },
          "created_at": 1461113796368
        }
      ];
      
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


  function createTweetElement(tweet, displayTime){ //create each tweet and its structure(HTML)
    let username = tweet.user.name;
    let handle = tweet.user.handle;
    let profileImg = tweet.user.avatars.small;
    let tweetContent = tweet.content.text;
    // let timeStamp = tweet.created_at;

    

    var $tweet = $("<article>").addClass("tweet")
    .append($("<header>").addClass("tweet-header")
      .append($("<img>").addClass("profile-img").attr("src", profileImg))
      .append($("<h2>").addClass("user-name").text(username))
      .append($("<h4>").text(handle))
    )
    .append($("<div>").addClass("tweet-text").text(tweetContent))
    .append($("<footer>").addClass("tweet-footer").text(displayTime))
    .append($("<div>").addClass("icons")
      .append($('<i class="fas fa-flag">'))
      .append($('<i class="fas fa-retweet">'))
        .append($('<i class="fas fa-heart">'))
    )
    
    return $tweet;
  }

  // renderTweets(data);
   
  $(".new-tweet form").on("submit", function(ev) {
    ev.preventDefault();
    if($(".tweet-content").val().length > 140){
      $(".error-message").slideDown().text("Exceed the maximum word limit!");
    }else if($(".tweet-content").val().length == 0){
      $(".error-message").slideDown().text("Tweet cannot be empty!");
    }else{
      $.ajax({
        url: "/tweets",  //post all the new tweets in the path
        method: "POST",
        data: $(this).serialize()
      }).then(function() {
        loadTweets()
      })
    // console.log("new-tweet", $(this).serialize());
     }   
  })


  loadTweets();

  function loadTweets(){
    $('.tweet').remove(); //remove the old tweets from the data to avoid the repetition. 
    $.ajax({
      url: "/tweets",   //will show all the tweets to this path
      method: "GET"
    }).then(function(tweets) { //save all the tweets and send this tweets when the renderTweets is called
      renderTweets(tweets)
    })
  }

});












// '<article class="tweet">
// //     <header class = "tweet-header" >
// //       <h2 class= > Intersting Name </h3>
// //       <h4> @funny  </h4>
// //     </header>  
// //     <div class="tweet-text"> I am a new tweet, Tweet,Tweet!!
// //     </div>
// //       <footer class= "tweet-footer">
// //         <span class= "timeStamp" > 
// //           10 days ago 
// //         </span>
// //           <div class= "icons">
// //               <i class="fas fa-flag"></i>
// //               <i class="fas fa-retweet"></i>
// //               <i class="fas fa-heart"></i>
// //       </div>
// //     </footer>
// // </article> '