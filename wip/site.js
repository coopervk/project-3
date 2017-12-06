// Release the dollar-sign from jQuery's control
$.noConflict();

// Re-introduce dollar sign scoped to self-executing
// function
(function($) {

  function repoToAPI(oldLink) {
    var username;
    var reponame;
    var temp;
    var regex_getLinkPieces = /github.com\/([^/]+)\/([^/]+)/;
    var newLink = null;
    if (typeof(oldLink) === "string" ) {
      temp = regex_getLinkPieces.exec(oldLink);
      if (temp) {
        username = temp[1];
        reponame = temp[2];
        newLink = "https://api.github.com/repos/" + username + "/" + reponame + "/commits";
      }
    }
    return newLink;
  }

  function userToAPI(oldLink) {
    var username;
    var temp;
    var regex_getLinkPieces = /github.com\/([^/]+)/;
    var newLink = null;
    if (typeof(oldLink) === "string" ) {
      temp = regex_getLinkPieces.exec(oldLink);
      if (temp) {
        username = temp[1];
        newLink = "https://api.github.com/users/" + username;
      }
    }
    return newLink;
  }

  if ( $('#home').length ) {
    var oldLink = "https://github.com/coopervk";
    var newLink = userToAPI(oldLink);
    if (newLink) {
      $.get(newLink, function( data ) {
        var imageLink;
        var bio;
        data = JSON.stringify(data);
        regex_getImageLink = /avatar_url\"\:\"([^]+)\"\,\"gravatar_id/;
        regex_getBio = /bio\"\:\"([^]+)\",\"public_repos/;
        imageLink = regex_getImageLink.exec(data);
        imageLink = imageLink[1];
        bio = regex_getBio.exec(data);
        bio = bio[1];
        $("aside").prepend( '<figure><img src=' + imageLink + ' alt="github profile picture" /><figcaption>(github bio) ' + bio + '</figure>' );
      });
    }
  }

  if ( $( "#projects" ).length ) {
    $( "a" ).each(function() {
      var oldLink = this.getAttribute( "href" );
      var newLink = repoToAPI(oldLink);
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
        });
      }
    });
  }
})(jQuery);
