const express = require('express');
const db = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');



const router = express.Router();


router.post('/signup',(req,res) => {
    const {email,password,invite} = req.body;

    try{
        const token = createToken(invite);
        validate(email,password,invite);
        const result = signup(email,password)
      
        res.status(200).json({email,token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
    

})

router.post('/login',(req,res) => {
   
})




module.exports = router

async function  encrypt(password){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    return hash
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

function checkPassword(str){
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

function validate (email,password,invite) {
    if(!email || !password){
        throw Error('All fields must be filled!')
    }

    if(!validateEmail(email)){
        throw Error('email is not valid')
    }
    if(!checkPassword(password)){
        throw Error('password not strong enough')
    }
}


const createToken = (invite) => {
   return  jwt.sign({invite},process.env.SECRET)
}


function signup(email,password) {
    const hash = encrypt(password);
    const user_id = uuidv4();

    const sql = `INSERT INTO users(email,hashed_password,user_id)
	VALUES ('${email}','${hash}','${user_id}');`;

    db.query(sql,(err,result) => {
        if(err) throw err;

    })

    return res
}