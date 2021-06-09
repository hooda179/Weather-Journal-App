// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get("/projectData",(req,res)=>{
    res.send(projectData);
})

app.post("/addData", (req, res) => {
    projectData = {...req.body};
    res.end();
});

app.get("/all", (req, res) => {
    res.send(projectData);
});




// Setup Server
const port = 3000;
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})
