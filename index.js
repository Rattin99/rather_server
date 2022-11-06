const express = require('express');
const app = express();
const cors = require('cors');
const getPost = require('./routers/getPosts')
const post = require('./routers/post')
const imagePost = require('./routers/imagePost')
const geturls = require('./routers/geturls');
const rank = require('./routers/rank')
const getRanked = require('./routers/getRanked')
const user = require('./routers/user')
const check = require('./routers/check');
const search = require('./routers/Search')


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
app.use(check)
app.use(search)

const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`listening on port ${port}`)
})