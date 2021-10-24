//to use app, in terminal run npm install express, npm install fs, npm install path, npm install, npm init.
// then in terminal run node server.js, and node server.js  each time you run the app after the prior installs
// open http://localhost:3001/notes in browser

const express = require('express');
const path = require("path");
const fs = require("fs");
let app = express();
let notes = require("./db/db.json");

const PORT = process.envPORT || 3001; 

// tells if initializing express, we can with json
app.use(express.json());
// should be able to read url coming in, extended:  part enables us to be able to do queries
app.use(express.urlencoded({extended: true}));

// use contents of spublic folder
app.use(express.static('public'));

// Routes
app.get("/notes", function (req, res){
  res.sendFile(path.join(__dirname, "public/notes.html"))
});

// Display Notes
app.get("/api/notes", function(req, res){
  fs.readFile("db/db.json", "utf8", function(err, data){
    if(err){
      console.log(err);
      return;
    }
    res.json(notes);
  })
});

// Create Note
app.post("/api/notes", function(req, res){
  let randomLetter = String.fromCharCode (65 + Math.floor(Math.random() * 26)); 
  let id = randomLetter + Date.now();
  let newNote = {
    id: id,
    title: req.body.title,
    text: req.body.text
  };
  notes.push(newNote);
  const stringifyNote = JSON.stringify(notes);
  res.json(notes);
  fs.writeFile("db/db.json", stringifyNote, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Note was saved to db.json!")
    }
  });
});


// start server
app.listen(PORT, () => {
  console.log (`App istening at PORT ${PORT}`);
});


