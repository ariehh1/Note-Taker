"use strict";

const path = require("path");
const fs = require("fs");


module.exports = app => {
app.get("/api/notes", function (req, res) {
    fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
        res.json(JSON.parse(data));
      });
    });



app.post()



app.delete()
