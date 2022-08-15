const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('express/lib/response');
const getPost = require('./routers/getPosts')
const post = require('./routers/post')
const imagePost = require('./routers/imagePost')
const geturls = require('./routers/geturls');

app.use(cors({
    origin: "*",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}))


app.use(express.json());
app.use(getPost)
app.use(post)
app.use(imagePost)
app.use(geturls)


app.listen(5000, () =>{
    console.log('listening on port 5000')
})