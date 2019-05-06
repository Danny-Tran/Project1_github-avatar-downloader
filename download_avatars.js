var request = require('request');
console.log('Welcome to Github Avatar Downloader!');
var secret = require('./secret')


// getRepoContributors("jquery", "jquery", function(err, result) {
//     console.log("Errors:", err);
//     console.log("Result:", result);
//   });
  
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization':secret.GITHUB_TOKEN
      }
    };
  
    request(options, function(err, res, body) {
      cb(err, body);
      var repos = JSON.parse(body);
      console.log(repos);
      repos.forEach(function(repo){
          console.log(repo.avatar_url)
      });
      
      });
    };

    getRepoContributors("jquery", "jquery", function(err, result) {
        // console.log("Errors:", err);
        // console.log("Result:", result);
      });
  
  
  