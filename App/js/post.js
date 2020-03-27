/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */


const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
}

const getPostIdParam= ()=>{
    const id = window.location.search;
    const finalId=id.split('=');
    return finalId[1];
}

const getPost = () => {
    // CODE GOES HERE
    const post=`${API_URL}${getPostIdParam()}`;
    fetch(post,{
        method:'GET'
    }).then((response)=>{
        return response.json();
    }).then((data)=>buildPost(data));
}

const buildPost = (data) => {
    // HINT: Convert the date number to a Date string 
   const postContainer=document.getElementById('post-container');
   const postDate= new Date(parseInt(data.added_date)).toDateString();
   const headerImg=`${API_BASE_URL}${data.post_image}`;
   const header=document.getElementsByTagName('header');
   header[0].setAttribute('style',`background-image:url(${headerImg})`);
   let post = ` <div class =' individual-post'>
                        <div id='individual-post-title'>${data.title}</div>
                        <div id='individual-post-date'>${postDate}</div>
                        <div id='individual-post-content'>${data.content}</div>
                    </div>`;
    postContainer.innerHTML=post;
}

