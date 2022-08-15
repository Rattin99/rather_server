const express = require('express');
const db = require('../db/db')


const router = express.Router();


router.post('/post',(req,res) =>{

    const title = req.body.title;
    const postid = req.body.postid;
    const post_text = req.body.post_text;

    let sql;

    if(post_text) sql =  `INSERT INTO posts(post_id,title,post_text)
    VALUES('${postid}','${title}','${post_text}');`;

    if(!post_text) sql =  `INSERT INTO posts(post_id,title)
    VALUES('${postid}','${title}');`

    

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })

})

module.exports = router;