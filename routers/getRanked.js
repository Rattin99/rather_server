const express = require('express');
const db = require('../db/db')


const router = express.Router();


router.use('/get/rankedlist/:id',(req,res) =>{
    const postid = req.params.id;

    const sql = `SELECT * FROM images
	WHERE images.post_id = '${postid}' ORDER BY ranking DESC;
    UPDATE posts SET post_ranked_by = post_ranked_by+1
    WHERE post_id = '${postid}';
    SELECT post_visits,post_ranked_by,post_text
    FROM posts
    WHERE post_id = '${postid}';`


    db.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result)
        res.send(result)
    })
})







module.exports = router;
