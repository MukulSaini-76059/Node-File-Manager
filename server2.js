const express = require("express");
const app = express()
const path = require("path")
const fs = require("fs")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/", function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files})
    })
})

app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filedata:filedata, filename:req.params.filename})
    })
})

app.post("/create", function(req,res){
  if(!req.body.title || !req.body.details) {
    return res.status(400).send("Title and details required");
  }
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){
    if(err) return res.status(500).send("Error creating file");
    res.redirect("/");
  })
})

app.listen(3000, function(){
    console.log("http://localhost:3000")
})

