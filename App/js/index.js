


const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    fetch(API_URL,
        {method:'GET'
    }).then((response)=>{
        return response.json();
    }).then((data)=>buildPosts(data));
}

const buildPosts = (blogPosts) => {
    //console.log(blogPosts);
    const postContainer=document.getElementById('main-container');
    let posts ='';
    blogPosts.forEach(post => {
        const dateString= new Date(parseInt(post.added_date)).toDateString();
        const postImage = `${API_BASE_URL}${post.post_image}`;
        const postLink=`post.html?id=${post.id}`;
        posts += `
        <a href="${postLink}" class='post-link'> 
        <div class='post'>
                    <div class="post-image" style="background-image:url(${postImage})"></div>
                    <div class="post-content">
                        <div class='post-date'>${dateString}</div>
                        <div class='post-title'>${post.title}</div>
                        <div class='post-text'>${post.content}</div>
                    </div>
        </div>
        </a>`;
    });
    postContainer.innerHTML=posts;
}