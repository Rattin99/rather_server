const express = require('express');
const db = require('../db/db');
const SqlString = require('sqlstring')


const router = express.Router()


router.post('/search',(req,res) => {
    let string = req.body.value;

    const sql = 'SELECT * FROM posts WHERE title LIKE "%' + string +'%" ;';

   try{
    
    db.query(sql,(err,result) => {
        if(err) throw err;

        res.send(result);
    })
   }catch(err){
    res.status(400).send(err)
   }
   
})







module.exports = router;