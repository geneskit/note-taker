const fs = require('fs');
const path = require('path');
const express = require('express');
const { notesData } = require('./develop/db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.json());

// functions
function filterById(id, noteCollection) {
    const result = noteCollection.filter(notesData => notesData.id === id)[0];
    return result;
}

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/db/db.json'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/db/db.json'))
});

app.get('/api/notes/:id', (req, res) => {
    const result = filterById(req.params.id, notesData);
    res.json(result);
})

app.post("/createNote", function(req, res){
    const noteInput = {};

    noteInput.id = Math.random() * 100;
    noteInput.title = req.body.note-title;
    noteInput.body = req.body.note-textarea;

    let notebook = JSON.parse(fs.readFileSync(notesData));
    notebook.push(noteInput);
    fs.writeFileSync(notebook, json.stringify(noteInput));

    res.json(notebook);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/db/db.json'))
})

// server port
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});