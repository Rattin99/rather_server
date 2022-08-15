const express = require('express');
const db = require('../db/db')


const router = express.Router();

router.post('/post/url/:id',(req,res) =>{
    const postId = req.body.postid;
    const download_url = req.body.downloadURL;

    const sql = `INSERT INTO images(image_url,post_id) VALUES('${download_url}','${postId}');`

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


module.exports = router;



