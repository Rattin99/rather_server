const express = require('express');
const db = require('../db/db')


const router = express.Router();

router.get('/check/:user_id/:post_id',(req,res) => {
    const user_id = req.params.user_id;
    const post_id = req.params.post_id;

    const sql = `SELECT if_checked FROM checking WHERE user_id = '${user_id}' AND post_id = '${post_id}';`


    db.query(sql,(err,result) => {
        if(err) throw err;

        res.status(200).json(result);
    })

    
})


module.exports = router;
