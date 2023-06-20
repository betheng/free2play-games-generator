// Function to call the API for random dad jokes
const getDadJoke = async function() {
    const dadJokeResponse = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json"
      }
    });
 // Gives user message if response fails   
    const dadJokeJSON = await dadJokeResponse.json();
    if (dadJokeJSON.status === 200) {
      return dadJokeJSON.joke;
    } else {
      return "Unfortunately, I cannot return a Dad joke at this time!";
    }
  };
// declares function that writes joke to the html area with element ID  
  function displayJoke() {
    const dadJokeContent = document.getElementById("dadjoke-content");
    getDadJoke().then(function(joke) {
      dadJokeContent.textContent = joke;
    });
  }
// calls funcation that prints joke to the html   
  displayJoke();
  
// Updates joke every 15 seconds
  setInterval(displayJoke, 15000);
  