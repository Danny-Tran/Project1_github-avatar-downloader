var request = require('request');
console.log('Welcome to Github Avatar Downloader!');
var secret = require('./secret')
var fs = require('fs')


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
      
      repos.forEach(function(repo){
          console.log(repo.avatar_url)
      });
      
      });
    };

    getRepoContributors("jquery", "jquery", function(err, result) {
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
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")
  
  