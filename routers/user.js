const express = require('express');
const db = require('../db/db')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const SqlString = require('sqlstring');


const router = express.Router();

router.post('/signup', async (req,res) => {
    const {email,password,invite} = req.body;

    console.log("signing up")

    try{
      
        validate(email,password,invite);
        signup(email,password,invite,res)
    
    }catch(err){
        res.status(400).json({error: err.message})
    }
    

})

router.post('/login', async (req,res) => {
   const {email,password} = req.body;
   
   
   const sql = SqlString.format(`SELECT user_id,hashed_password FROM users WHERE email = ?;`,[email])
   
   db.query(sql,(err,result) => {

       if(err) throw err;

       if(result.length == 0) res.status(400).json({error:'email does not exist',user_id:null});

       else{
        const {user_id,hashed_password}  = result[0]

        bcrypt.compare(password,hashed_password,(error,re) =>{
            if(error) throw error;

            if(re) res.status(200).json({user_id,error:null});
            else res.status(400).json({error:'password does not match',user_id:null})
        })
       }

   })

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


async function signup(email,password,invite,res) {
    const hash = await encrypt(password);
    const user_id = uuidv4();

    const inviteCheck = SqlString.format(`SELECT invite FROM invites WHERE invite = ?;`,[invite])

    console.log("sign up function called")
    try{

        const result = await new Promise((res, rej) =>  db.query(inviteCheck,[email,hash,user_id],async (err,result) => {
            if(err) rej(err);
            res(result)
        }))
        console.log(result)
        if(result.length == 1) {
            await addToDB(email,hash,user_id,invite,db,res)
        }
        
        if(result.length == 0) res.status(404).json({error: 'invalid referral'})
        
    }catch(err){
        res.status(404).json("ERROR")
    }
    return res
}


async function addToDB(email,hash,user_id,invite,db,res){

    const sql = SqlString.format(`START TRANSACTION; 

    INSERT INTO users(email,hashed_password,user_id)
    VALUES (?,?,?);
        
    DELETE FROM invites WHERE  invite = '${invite}';
    
    COMMIT;`,[email,hash,user_id])

    console.log("adding to db")

    try{
    const result = new Promise((res, rej) => db.query(sql,(err,result) =>{
       if(err) {
        rej(err)
        }
        res(result)

    }))
    res.status(200).json({result:"signup successful"});
    console.log(result)
    }catch(err){
        if(err.sqlState = "2300") res.status(400).json(err)

        throw err;
    }
}