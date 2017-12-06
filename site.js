// Release the dollar-sign from jQuery's control
$.noConflict();

// Re-introduce dollar sign scoped to self-executing
// function
(function($) {

  function repoToAPI(oldlink) {
    var username;
    var reponame;
    var temp;
    var regex_getLinkPieces = /github.com\/([^/]+)\/([^/]+)/;
    var newlink = null;
    if (typeof(oldlink) === "string" ) {
      temp = regex_getLinkPieces.exec(oldlink);
      if (temp) {
        username = temp[1];
        reponame = temp[2];
        newlink = "https://api.github.com/repos/" + username + "/" + reponame + "/commits";
      }
    }
    return newlink;
  }

  function userToAPI(oldlink) {
    var username;
    var temp;
    var regex_getLinkPieces = /github.com\/([^/]+)/;
    var newlink = null;
    if (typeof(oldlink) === "string" ) {
      temp = regex_getLinkPieces.exec(oldlink);
      if (temp) {
        username = temp[1];
        newlink = "https://api.github.com/users/" + username;
      }
    }
    return newlink;
  }

  if ( $('#home').length ) {
    console.log("Congrats, you're on the home page!");
    var oldLink = "https://github.com/coopervk";
    var newLink = userToAPI(oldLink);
    console.log(newLink);
    if (newLink) {
      $.get(newLink, function( data ) {
        var imageLink;
        var bio;
        data = JSON.stringify(data);
        console.log(data);
        regex_getImageLink = /avatar_url\"\:\"([^]+)\"\,\"gravatar_id/;
        regex_getBio = /bio\"\:\"([^]+)\",\"public_repos/;
        imageLink = regex_getImageLink.exec(data);
        imageLink = imageLink[1];
        console.log(imageLink);
        bio = regex_getBio.exec(data);
        bio = bio[1];
        console.log(bio);
      });
    }
  }

  if ( $( "#projects" ).length ) {
    $( "a" ).each(function() {
      var oldLink = this.getAttribute( "href" );
      var newLink = repoToAPI(oldlink);
      var linkTag = this;
      if (newLink) {
        $.get(newLink, function( data ) {
          var commitMessage;
          var regex_getLastCommitMessage;
          var updateTag;
          data = JSON.stringify(data[0]);
          regex_getLastCommitMessage = /message":"([^]+)","tree"/;
          commitMessage = regex_getLastCommitMessage.exec(data);
          commitMessage = commitMessage[1];
          updateTag = $(linkTag).parent().nextAll(".update").get()[0];
          if (updateTag) {
            $(updateTag).replaceWith( '<li class="update"><strong>Latest Update:</strong> ' + commitMessage + '</li>' );
          }
          console.log("\n\n");
        });
      console.log("\n\n");
      }
    });
  }
})(jQuery);
