"use strict";

const fs = require("fs");
var noteList = require("../db/db.json");

let i = 0,
  ln = noteList.length;
for (i; i < ln; i++) {
  noteList[i].id = i + 1;
}

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(noteList);
  });

  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    if (noteList.length > 0) {
      newNote.id = noteList[noteList.length - 1].id + 1;
    } else {
      newNote.id = 1;
    }
    noteList.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(noteList), (results, err) => {
      if (err) console.log(err);
      res.json(results);
    });
  });

  app.delete("/api/notes/:id", function(req, res) {
    const deleter = noteList.findIndex(
      location => location.id === parseInt(req.params.id)
    );
    noteList.splice(deleter, 1);

    fs.writeFile("./db/db.json", JSON.stringify(noteList), (results, err) => {
      if (err) console.log(err);
      res.json(results);
    });
  });
};
