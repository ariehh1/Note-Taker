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
};
