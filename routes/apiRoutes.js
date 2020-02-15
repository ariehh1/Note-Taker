"use strict";

const path = require("path");
const fs = require("fs");

module.exports = app => {
  app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      console.log(JSON.parse(data));
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      let newNote = req.body;
      let notesArr = JSON.parse(data);
      let id = notesArr[notesArr.length - 1].id + 1;
      newNote.id = id;
      notesArr.push(newNote);
      let notesString = JSON.stringify(notesArr);
      console.log(typeof notesString);
      fs.writeFileSync(path.join(__dirname, "../db/db.json"), notesString);
    });
  });

  app.delete("/api/notes/:id", function(req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
      if (err) throw err;
      console.log(req.params.id);
      //console.log(JSON.parse(data));
      let notesArr = JSON.parse(data);
      let newNotesArr = [];
      for (i = 0; i < notesArr.length; i++) {
        if (notesArr[i].id != req.params.id) {
          newNotesArr.push(notesArr[i]);
        }
      }
      console.log(newNotesArr);
      let notesString = JSON.stringify(newNotesArr);
      console.log(notesString);
      fs.writeFileSync(path.join(__dirname, "../db/db.json"), notesString);
    });
  });
};
