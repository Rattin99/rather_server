const express = require('express');
const db = require('../db/db')


const router = express.Router();


router.get('/info/:id',(req,res) =>{
    const postid = req.params.id;

    const sql = `SELECT post_visits,post_ranked_by,post_text FROM posts WHERE post_id = '${postid}';`

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

module.exports = router;