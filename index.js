const express = require('express');
const app = express();
const cors = require('cors');
const getPost = require('./routers/getPosts')
const post = require('./routers/post')
const imagePost = require('./routers/imagePost')
const geturls = require('./routers/geturls');
const rank = require('./routers/rank')
const getRanked = require('./routers/getRanked')
const getinfo = require('./routers/getinfo');
const user = require('./routers/user')



require('dotenv').config()

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
app.use(rank)
app.use(getRanked)
app.use(user)

app.listen(5000, () =>{
    console.log('listening on port 5000')
})