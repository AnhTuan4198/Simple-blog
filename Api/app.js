const express= require('express');
const app=express();
const Post= require ("./api/models/post.js");
var multer=require('multer');
const postData = new Post();

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`);
  }
});

const getExtension=(ext)=>{
    switch (ext) {
      case "image/png":
        return ".png";
      case "image/jpeg":
        return ".jpg";
    }
}

var upload=multer({storage:storage})
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    next();
})

app.use(express.json());
app.use('/uploads',express.static('uploads'));

app.get('/api/posts',(req,res)=>{
    res.status(200).send(postData.get())
});

app.get('/api/posts/:post_id',(req,res)=>{
    const postId=req.params.post_id;
    const foundPost=postData.getIndividualBlog(postId);
    if(foundPost){
        res.status(200).send(foundPost)
    }else{
        res.status(404).send('Page not found')
    }
})


app.post("/api/posts", upload.single("post_image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  
  const location=`uploads/${req.file.filename}`
  const newPost = {
    'id': `${Date.now()}`,
    'title': req.body.title,
    'content': req.body.content,
    'added_date': `${Date.now()}`,
    'post_image': location
  };
  console.log(location);
  postData.add(newPost);
  res.status(201).send(newPost);
});

app.listen(3000,()=>console.log("I have a bug "))