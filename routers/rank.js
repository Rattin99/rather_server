const express = require('express');
const db = require('../db/db')


const router = express.Router();


router.post('/post/rank/:id', (req,res) =>{
    const postId = req.params.id;
    const imageArray = req.body.imageArray;


    let  sql = '';

    imageArray.map((value,index) =>{

        const image_url = value.image_url;
        const ranking = value.ranking

        sql += `UPDATE images SET ranking = ${ranking} WHERE post_id = '${postId}' AND image_url = '${image_url}';`

    });

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.status(200).json(result)
    })

})


module.exports = router;