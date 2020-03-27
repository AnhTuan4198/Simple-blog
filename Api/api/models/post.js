const PATH= './data.json';
const fs = require('fs');


class post {
    get(){
        return this.readData();
    }
    getIndividualBlog(postId){
        const posts=this.readData();
        const foundPost=posts.find((post)=>post.id==postId);
        return foundPost;
    }
    add(newData){
        const currentPost=this.readData();
        currentPost.unshift(newData)
        this.storeData(currentPost);
    }
    readData(){
        let rawData=fs.readFileSync(PATH);
        let posts=JSON.parse(rawData);
        return posts;
    }
    storeData(rawData){
        let newData=JSON.stringify(rawData);
        fs.writeFileSync(PATH,newData);
    }
}

module.exports = post;