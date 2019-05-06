var request = require('request');
console.log('Welcome to Github Avatar Downloader!');
var secret = require('./secret.js')
var fs = require('fs')
var first = process.argv[2];
var last = process.argv[3]
if (!first) {
    console.log("Please enter something")
}

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
        var repos = JSON.parse(body);
    //   console.log(repos)
      repos.forEach(function(repo){
        //   console.log(repo.avatar_url)
          downloadImageByURL(repo.avatar_url, "avatar/" + repo.login + ".jpg")
      });
      cb(err, body);
      });
    };

    getRepoContributors(first, last, function(err, result) {
        // console.log("Errors:", err);
        // console.log("Result:", result);

      });

    function downloadImageByURL(url, filePath) {
    request.get(url)               
    .on('error', function (err) {                                   
      throw err; 
    })
    .on('response', function (response) {                           
      console.log('Response Status Code: ', response.statusCode);
      
    })
    .pipe(fs.createWriteStream(filePath));  
}
// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")
  
  