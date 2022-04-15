const express = require('express');
const app = express();
const cors = require('cors');
const { json } = require('express/lib/response');

app.use(cors({
    origin: "*",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}))
app.use(express.json());


const database = [
]

const urls = [
    // {
    //     'download_url':"https://firebasestorage.googleapis.com/v0/b/rather-cec85.appspot.com/o/213760071_284154413495726_5631478718705914431_n.png?alt=media&token=567d8706-43cc-42ed-b4ab-511e34be2ec2",
    // },
    // {
    //     'download_url':'https://firebasestorage.googleapis.com/v0/b/rather-cec85.appspot.com/o/212276867_191721356239432_348553397381998477_n.png?alt=media&token=608ce670-137e-488e-b8c8-b9d743db5ff7',
    // },
    // {
    //     'download_url':'https://firebasestorage.googleapis.com/v0/b/rather-cec85.appspot.com/o/212629981_243367204027392_1902696555879962282_n.png?alt=media&token=5cf6835a-d0ae-472f-849c-f45086ece4f7',
    // },
    // {
    //     'download_url':
    // 'https://firebasestorage.googleapis.com/v0/b/rather-cec85.appspot.com/o/213757525_772189133447393_6263761998522327512_n%20(1).png?alt=media&token=fcf0eadb-2383-4a4b-b4c2-54cb51127037',

    // },
    // {
    //     'download_url':
    // 'https://firebasestorage.googleapis.com/v0/b/rather-cec85.appspot.com/o/213078645_205716904675107_6232331426887558529_n.jpg?alt=media&token=41b731e1-f3cc-498b-854d-a8a4b2f83f85',
    // },
    // {
    //     'download_url':
    //     'https://firebasestorage.googleapis.com/v0/b/rather-cec85.appspot.com/o/213078645_205716904675107_6232331426887558529_n.jpg?alt=media&token=41b731e1-f3cc-498b-854d-a8a4b2f83f85',

    // }
]


function emni(){
    for(let i = 0;i< 100; i++){

        const bal = Math.floor(Math.random()*100);
        database.push(bal)
    }
}

emni()


app.get('/post/:id',(req,res) =>{
    const id = req.params.id;
    res.send('hello world: '+id)
})

app.get('/posts',(req,res) => {
    console.log('req is here')
    res.send({database})
})

app.post('/post',(req,res)=>{
    console.log(req.body)

    res.send('req paisi')
})

app.post('/post/url/:id',(req,res)=>{
    console.log(req.body)
    urls.push({
        'download_url': req.body.downloadURL
    })
    console.log(req.params.id)
    res.send('req paisi')
})

app.get('/urls',(req,res) => {
    res.send(urls)
})

app.listen(5000, () =>{
    console.log('listening on port 5000')
})