
const express = require("express");
const app = express();
const ejs = require("ejs"); 
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodoverride=require("method-override");
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

let posts = [
  { id:uuidv4(),username: "apna college", content: "i love coding" },
  { id:uuidv4(),username: "sasank2323", content: "hard work" },
  { id:uuidv4(),username: "rahul", content: "awesome" },
];
app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    console.log(username);
    res.redirect("/posts");
  });

  app.get("/", (req, res) => {
    console.log(app.get('views')); // This will log the views directory path
    res.render("working"); 
});


app.patch("/posts/:id",(req,res)=>
{
  let {id}=req.params;
  let newcontent=req.body.content;
  let post=posts.find((p)=> id==p.id);
  post.content=newcontent;
  console.log(post);
  res.redirect("/posts");
})
//in edit.ejs the commend will move to app.patch that means it require changes in it so it was moving to patch system
app.get("/posts/:id/edit",(req,res)=>
{
  let {id}=req.params;
  let post=posts.find((p)=> id==p.id);
  res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>
{
  let {id}=req.params;
   posts=posts.filter((p)=> id !==p.id);
  res.redirect("/posts");
})



app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); 
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs"); 
});

app.get("/posts/:id", (req, res) => {
  let {id}=req.params;
  console.log(id);
  let data=posts.find((postsdata)=> id==postsdata.id);
  console.log(data);
  res.render("show.ejs",{data});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});