const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./develop/db/db.json');
const { title } = require('process');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.json());

// functions


//routes
app.get('/', (req, res) => {
    let listedNotes = notes;
    res.json(listedNotes);
});

app.post("/createNote", function(req, res){
    const noteInput = {};

    noteInput.id = Math.random() * 100;
    noteInput.title = req.body.note-title;
    noteInput.body = req.body.note-textarea;

    let notebook = JSON.parse(fs.readFileSync(notes));
    notes.push(noteInput);
    fs.writeFileSync(notes, json.stringify(noteInput));
    
    res.redirect('/');
})

app.post("/deleteNote/:id", (req, res) => {
    const trashNote = notes.filter(item.id != req.params.id);
    notes = trashNote;
})

// server port
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});