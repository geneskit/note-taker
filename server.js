const fs = require('fs');
const path = require('path');
const express = require('express');
const { notesData } = require('./develop/db/db.json');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.json());

// functions
function filterById(id, array) {
    const result = noteCollection.filter(notesData => notesData.id === id)[0];
    return result;
}

function createNote(e, array) {
    const noteObj = e;
    notesData.push(noteObj);
    fs.writeFileSync(
        path.join(__dirname, './develop/db/db.json'),
        JSON.stringify({ notesData: array}, null, 2)
    );
    return noteObj;
}

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/db/db.json'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
    const result = filterById(req.params.id, notesData);
    res.json(result);
})

app.post('/api/notes', (req, res) => {
    req.body.id = notesData.length.toString();
    const note = createNote(req.body, notesData);
    res.json(note);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/db/db.json'))
})

// server port
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});