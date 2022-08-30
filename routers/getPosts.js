const express = require('express');
const db = require('../db/db')


const router = express.Router();



router.get('/posts',(req,res) =>{

    const sql  = `SELECT * FROM rather_db.posts ORDER BY post_time DESC;`

    db.query(sql,(err,result) =>{
        if(err) throw err;
        res.send(result)
    })

})



module.exports = router;