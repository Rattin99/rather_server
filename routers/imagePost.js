const express = require('express');
const db = require('../db/db')
const SqlString = require('sqlstring')


const router = express.Router();

router.post('/post/url/:id',(req,res) =>{
    const postId = req.body.postid;
    const download_url = req.body.downloadURL;
    const caption = req.body.caption;

    const sql = SqlString.format(`INSERT INTO images(image_url,post_id,caption) VALUES(?,?,?);`,[download_url,postId,caption])

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


module.exports = router;



