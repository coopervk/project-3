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
    console.log(linkTag.getAttribute( "href" ));
    console.log($(linkTag).get()[0].getAttribute( "href" ));
    console.log($(linkTag).get()[0].tagName);
    if (newlink) {
      $.get(newlink, function( data ) {
        var commitMessage;
        var regex_getLastCommitMessage;
        var updateTag;
        data = JSON.stringify(data[0]);
        regex_getLastCommitMessage = /message":"([^]+)","tree"/;
        commitMessage = regex_getLastCommitMessage.exec(data);
        commitMessage = commitMessage[1];

        console.log("linkTag: " + $(linkTag).get()[0].tagName);
        console.log("linkTag's parent: " + $(linkTag).parent().get()[0].tagName);
        console.log("linkTag's parent's next: " + $(linkTag).parent().nextAll("li.update").get()[0].tagName);
        updateTag = $(linkTag).parent().nextAll(".update").get()[0];
        $(updateTag).replaceWith( '<li class="update"><strong>(NOTE: ALTERED BY JS)Latest Update:</strong> ' + commitMessage + '</li>' );
        console.log("\n\n");
      });
    console.log("\n\n");
    }
  });
})(jQuery);
