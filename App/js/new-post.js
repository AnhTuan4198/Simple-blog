const API_URL = "http://localhost:3000/api/posts";

const submitNewPost = () => {
    let title=document.getElementById('form-post-title').value;
    const content=document.getElementById('form-post-content').value;
    const image = document.querySelector('input[type="file"]');
    let data= new FormData();
    data.append('title',title);
    data.append("content", content);
    data.append("post_image", image.files[0]);
    console.log(data);
    fetch(API_URL,{
        method:"POST",
        body:data
    }).then(()=>{
        setTimeout(()=>{
             window.location.href = "index.html";
             console.log("ok")
        },1000)
    })
    
}