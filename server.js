//to use app, in terminal run npm install express, npm install fs, npm install path, npm install, npm init.
// then in terminal run node server.js, and node server.js  each time you run the app after the prior installs
// open http://localhost:3001/notes in browser

const express = require('express');
// const apiRoutes = require('/routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');
const path = require("path");
const fs = require("fs");
let app = express();
let notes = require("./db/db.json");

const PORT = process.env.PORT || 3001; 

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

// start server
app.listen(PORT, () => {
  console.log (`App istening at PORT ${PORT}`);
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
  // needs to stringgift note for brower to read
  const stringifyNote = JSON.stringify(notes);
  
  // push notes to browser
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

// Delete Note
app.delete("/api/notes/:id", function (req, res) {
  
  let noteID = req.params.id;
  fs.readFile("db/db.json", "utf8", function (err, data) {
    let updatedNotes = JSON.parse(data).filter((note) => {
      console.log("note.id", note.id);
      console.log("noteID", noteID);
      return note.id !== noteID;
    });
    notes = updatedNotes;
    const stringifyNote = JSON.stringify(updatedNotes);
    fs.writeFile("db/db.json", stringifyNote, (err) => {
      if (err) console.log(err);
      else {
        console.log("Note successfully deleted from db.json");
      }
    });
    res.json(stringifyNote);
  });
});

// Catch all error route
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


