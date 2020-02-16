"use strict";

const fs = require("fs");
const path = require("path");
var notesData = getNotes();

function getNotes() {
  let data = fs.readFileSync("./db/db.json", "utf8");

  let notes = JSON.parse(data);

  for (let i = 0; i < notes.length; i++) {
    notes[i].id = "" + i;
  }

  return notes;
}

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    notesData = getNotes();
    res.json(notesData);
  });

  app.post("/api/notes", function(req, res) {
    notesData.push(req.body);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData), "utf8");
    res.json(true);
  });

  app.delete("/api/notes/:id", function(req, res) {
    const requestID = req.params.id;

    let note = notesData.filter(note => {
      return note.id === requestID;
    })[0];

    const index = notesData.indexOf(note);

    notesData.splice(index, 1);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesData), "utf8");
    res.json("Note deleted");
  });
};
