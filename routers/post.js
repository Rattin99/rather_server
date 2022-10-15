const express = require('express');
const db = require('../db/db');
const SqlString = require('sqlstring')


const router = express.Router();


router.post('/post',(req,res) =>{

    const title = req.body.title;
    const postid = req.body.postid;
    const post_text = req.body.text;

    let sql;

    if(post_text) sql =  SqlString.format(`INSERT INTO posts(post_id,title,post_text,post_time) VALUES(?,?,?,now());`,[postid,title,post_text]);

    if(!post_text) sql =  SqlString.format(`INSERT INTO posts(post_id,title,post_time)
    VALUES(?,?,now());`,[postid,title]);

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })

})

module.exports = router;