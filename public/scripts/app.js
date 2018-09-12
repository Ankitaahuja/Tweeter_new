/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
        for (let tweet of tweets) {
            let $eachTweet = createTweetElement(tweet);
            $('#tweets-container').append($eachTweet);
        // loops through tweets
          // calls createTweetElement for each tweet
          // takes return value and appends it to the tweets container
        }
    }


  function createTweetElement(tweet){
    let username = tweet.user.name;
    let handle = tweet.user.handle;
    let profileImg = tweet.user.avatars.small;
    let tweetContent = tweet.content.text;
    let timeStamp = tweet.created_at;

    

    var $tweet = $("<article>").addClass("tweet")
    .append($("<header>").addClass("tweet-header")
        .append($("<h2>").addClass("user-name").text(username))
        .append($("<h4>").text(handle))
        .append($("<img>").addClass("profile-img").attr("src", profileImg))
    )
    .append($("<div>").addClass("tweet-text").text(tweetContent))

    .append($("<footer>").addClass("tweet-footer").text(timeStamp))
    .append($("<div>").addClass("icons")
        .append($('<i class="fas fa-flag">'))
        .append($('<i class="fas fa-retweet">'))
        .append($('<i class="fas fa-heart">'))
    )
    

    // .append($('<i class="fas fa-flag">'))
        // .append($("<h2>").addClass("user-name").text(name)))
    // .append($("<div>").addClass("tweet-text").text(tweet.user.name))


//     let $tweet = '<article class="tweet">
//     <header class = "tweet-header" >
//       <h2 class= > Intersting Name </h3>
//       <h4> @funny  </h4>
//     </header>  
//     <div class="tweet-text"> I am a new tweet, Tweet,Tweet!!
//     </div>
//       <footer class= "tweet-footer">
//         <span class= "timeStamp" > 
//           10 days ago 
//         </span>
//           <div class= "icons">
//               <i class="fas fa-flag"></i>
//               <i class="fas fa-retweet"></i>
//               <i class="fas fa-heart"></i>
//       </div>
//     </footer>
// </article> '

    // ...
    
    return $tweet;
  }

  renderTweets(data);
});