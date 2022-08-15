const express = require('express');
const db = require('../db/db')


const router = express.Router();


router.get('/urls/:id',(req,res) =>{
    const postid = req.params.id;

    const sql = `SELECT * FROM images
	WHERE images.post_id = '${postid}';`

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})


module.exports = router;