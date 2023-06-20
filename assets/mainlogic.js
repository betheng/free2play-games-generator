// Function to call the API with open parameters based on radio button logic
function callAPI(platform, genre) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${platform}&category=${genre}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd518377908mshe401b1f8e3abd60p1e5d42jsncb53b176840a',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

 // options needed due to CORS error; found headers on API site under CORS issues   
    fetch(url, options)
    .then(function(response) {
      return response.json();
    })

 // makes empty array, sets the number of objects allowed to 3
    .then(function(data) {
      var randomGames = [];
      var numberOfObjects = 3;

// loops through numberofobjects variable above and selects random index number from the "data" array created from api call
// math random generates number from 0-1, then floor rounds to nearest whole number
// puts the randomly generated games into new index/array     
    for (let i = 0; i < numberOfObjects; i++) {
        var randomIndex = Math.floor(Math.random() * data.length);
        randomGames.push(data[randomIndex]);
      }
// logs to console to check output is correctly 3 objects
      console.log("Random Games", randomGames);
// extracts needed KVPs and then logs to console to check output is corrrectly returning 4 KVPs from randomGames
var extractedGameInfo = randomGames.map(function(gameInfo) {
    return {
      title: gameInfo.title,
      thumbnail: gameInfo.thumbnail,
      short_description: gameInfo.short_description,
      game_url: gameInfo.game_url
    };
  });

  console.log("Title, ShortDescription, URL, Thumbnail:", extractedGameInfo);
   // Print randomGames to table
   var tableBody = document.querySelector("table tbody");

   // Clear previous table content
   tableBody.innerHTML = "";
 
   // Populate the table with randomGames data
   extractedGameInfo.forEach(function(game) {
     var row = document.createElement("tr");
 
     var titleCell = document.createElement("td");
     titleCell.textContent = game.title;
     row.appendChild(titleCell);
 
     var descriptionCell = document.createElement("td");
     descriptionCell.textContent = game.short_description;
     row.appendChild(descriptionCell);
 
     var urlCell = document.createElement("td");
     urlCell.innerHTML = `<a href="${game.game_url}" target="_blank">${game.game_url}</a>`;
     row.appendChild(urlCell);
 
     var thumbnailCell = document.createElement("td");
     var thumbnailImg = document.createElement("img");
     thumbnailImg.src = game.thumbnail;
     thumbnailCell.appendChild(thumbnailImg);
     row.appendChild(thumbnailCell);
 
     tableBody.appendChild(row);
   });
})
    .catch(function(error) {
      console.error("API Error:", error);
    }); 
    }
  
  // html radio button elements for platform selection
  var pcRadioBtn = document.getElementById("pcRadioBtn");
  var browserRadioBtn = document.getElementById("browserRadioBtn");
  
  // html radio button elements for genre selection
  var shooterRadioBtn = document.getElementById("shooterRadioBtn");
  var mmorpgRadioBtn = document.getElementById("mmorpgRadioBtn");
  var strategyRadioBtn = document.getElementById("strategyRadioBtn");
  var sideScrollerRadioBtn = document.getElementById("sideScrollerRadioBtn");
  var fantasyRadioBtn = document.getElementById("fantasyRadioBtn");
  var actionRadioBtn = document.getElementById("actionRadioBtn");
  
  // Function choose which radio button is selected
  function handleRadioButtonChange() {
  // Get the selected platform value
    var platform;
    if (pcRadioBtn.checked) {
      platform = "pc";
    } else if (browserRadioBtn.checked) {
      platform = "browser";
    }
  // Get the selected genre value to complete the category parameter
    var genre;
    if (shooterRadioBtn.checked) {
        genre = "shooter";
    } else if (mmorpgRadioBtn.checked) {
        genre = "mmorpg";
    } else if (strategyRadioBtn.checked) {
        genre = "strategy";
    } else if (sideScrollerRadioBtn.checked) {
        genre = "side-scroller";
    } else if (fantasyRadioBtn.checked) {
        genre = "fantasy";
    } else if (actionRadioBtn.checked) {
        genre = "action";
    }
    
// function that calls API function and adds in platform and genre parameters to url
    if (platform && genre) {
      callAPI(platform, genre);
    }
  }
  
  // Html submit button element
  var submitButton = document.getElementById("submitBtn");
  
  // Function to handle the submit button click event
  function handleButtonClick() {
  // Call the handleRadioButtonChange function when the submit button is clicked
    handleRadioButtonChange();
  }
  
  // "click" "event listener for the submit button
  submitButton.addEventListener("click", handleButtonClick);