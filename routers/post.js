const express = require('express');
const db = require('../db/db')


const router = express.Router();


router.post('/post',(req,res) =>{

    const title = req.body.title;
    const postid = req.body.postid;
    const post_text = req.body.text;
    const time = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString().split("/").reverse().join("-");

    const datetime = `${date} ${time}`;

    let sql;

    if(post_text) sql =  `INSERT INTO posts(post_id,title,post_text,post_time)
    VALUES('${postid}','${title}','${post_text}',now());`;

    if(!post_text) sql =  `INSERT INTO posts(post_id,title,post_time)
    VALUES('${postid}','${title}',now());`

    

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })

})

module.exports = router;