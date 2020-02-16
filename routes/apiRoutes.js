"use strict";

const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");
var noteJSON = require("../db/db.json");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.JSON(noteJSON);
  });

  app.post("/api/notes", function(req, res) {
    const newNote = req.body;
    const file = path.join(__dirname, "../db/db.json");
    newNote.id = uuidv4();
    noteJSON.push(newNote);
    fs.writeFile(file, JSON.stringify(noteJSON, null, 4), err => {
      if (err) throw err;
      console.log("Note has been saved successfully.");
    });
    res.send(newNote);
  });

  app.post("/api/notes/:note", function(req, res) {
    noteJSON.push(req.body);
    res.json(true);
  });

  app.delete("/api/notes/:note", function(req, res) {
    var selected = req.params.note;
    noteJSON.pop(selected);
    res.json(true);
  });
};
