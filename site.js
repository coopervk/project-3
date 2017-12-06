// Release the dollar-sign from jQuery's control
$.noConflict();

// Re-introduce dollar sign scoped to self-executing
// function
(function($) {

  function normalToAPIGitLink(oldlink) {
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


  $( "a" ).each(function() {
    var oldlink = this.getAttribute( "href" );
    var newlink = normalToAPIGitLink(oldlink);
    var linkTag = this;
    if (newlink) {
      $.get(newlink, function( data ) {
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
})(jQuery);
