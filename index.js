const { getProductById } = require("ugog-product")
const http = require("http")


// random game IDS
gameIDs = [1750252381, 1412601690, 1456460669, 1409964317, 1207659162, 1724969043, 1841195376,
    1972906591, 1453375253, 1248282609, 1453298883, 2093619782, 1977534128, 1224800338,
    1207660603, 1242989820, 1207658957, 1312824873, 1746700646, 1771589310, 1312824873]
usedGameIDs = []
descs = []

const randomGames = () => {
    usedGameIDs = []
    descs = []
    for (let i = 0; i < 5; i++) {
        let gameID = gameIDs[Math.floor(Math.random() * gameIDs.length)] // random game ID
        while (usedGameIDs.includes(gameID)) { // anti-duplication!
            gameID = gameIDs[Math.floor(Math.random() * gameIDs.length)]
            console.log("Duplicate: " + gameID)
        }
        usedGameIDs.push(gameID)
        getProductById(gameID).then(function (product) {
            descs.push(product.getTitle())
            descs.push(product.getReleaseDate())
            descs.push(product.getProductCard())
            console.log("-------\ngames pushed: " + product.getTitle() + "\nID: " + gameID)
        });
    }
}

const newPage = () => {
    http.createServer(function (req, res) {
        setTimeout(function () {
            randomGames() // wait for random game generation to finish
        }, 0);
        console.log("Page loaded")
        res.writeHead(200, { 'Content-Type': 'text/html' });
        //add bootstrap 
        res.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">')

        res.write('<h1 class="text-center">5 random games!</h1><center><button class="btn btn-primary btn-lg btn-block" onclick="window.location.reload()">Generate new games</button></center><hr>')
        
        // loop through and display all games
        j = 1 // title number
        for (let i = 0; i < descs.length; i++) {
            res.write('<h2 class="text-center"> ' + j++ + '. ' + descs[i++] + '</h2>');
            res.write('<p class="text-center">Release date: <span class="fst-italic">' + descs[i++] + '</span></p>');
            res.write('<a href="' + descs[i] + '"><p class="text-center">' + descs[i] + '</p></a>');
            res.write('<hr>');
        }

        res.end();
    }).listen(8080);
}

randomGames() // first time run
newPage() // first time run