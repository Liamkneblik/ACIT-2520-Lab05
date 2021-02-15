/*
 Authors:
 Your name and student #:
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require('fs')

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  let textareaData = ''
  res.render("pages/index",{textareaData:textareaData})
});

app.get("/myForm", (req, res) => res.render("pages/myForm"));


app.post("/myForm", (req, res) => {
  // Add your implementation here 
  let textarea = req.body
  let textareaData =textarea.Movies.split(',')
  console.log(textareaData)
  res.render("pages/index",{textareaData:textareaData})
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  let movie1 = req.query.movie1
  let movie2 = req.query.movie2
  let textareaData = [movie1,movie2]
  res.render("pages/index",{textareaData:textareaData})
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  let list = []
  let search = req.params.movieName
  fs.readFile("movieDescriptions.txt",'utf8', (err,data) =>{
    if (err){
      console.log(err)
    } 
    else{
      console.log(data)
      let datas = data.split('\n')
      for (let lines of datas){
        let line = lines.split(':')
        let movSet = {Movie:line[0], Desc:line[1]}
        list.push(movSet)
      }
    console.log(list)
    res.render("pages/searchResult",{list:list, search:search})
    }
  })

});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});