const express = require('express');
const db = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');



const router = express.Router();

router.post('/signup',(req,res) => {
    const {email,password,invite} = req.body;

    try{
      
        validate(email,password,invite);
        signup(email,password,invite,res)
    
    }catch(err){
        res.status(400).json({error: err.message})
    }
    

})

router.post('/login', async (req,res) => {
   const {email,password} = req.body;
   
   
   
   const sql = `SELECT user_id,hashed_password FROM users WHERE email = '${email}';`

   db.query(sql,(err,result) => {

       if(err) throw err;

       if(result.length == 0) res.status(400).json('email does not exist');

       else{
        const {user_id,hashed_password}  = result[0]

        bcrypt.compare(password,hashed_password,(error,re) =>{
            if(re) res.status(200).json({user_id});
            else res.status(400).json('passwod does not match')
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

//not gonna use this 
const createToken = (invite) => {
   return  jwt.sign({invite},process.env.SECRET)
}


function signup(email,password,invite,res) {
    const hash = encrypt(password);
    const user_id = uuidv4();

    const inviteCheck = `SELECT invite FROM rather_db.invites WHERE invite = '${invite}';`

    db.query(inviteCheck,[email,hash,user_id],(err,result) => {
        if(err) throw err;

        if(result.length == 1) {

          hash.then((value => addToDB(email,value,user_id,invite,db,res)))
            
        }

        if(result.length == 0) res.status(404).json('invalid referral')
        
    })

    return res
}


function addToDB(email,hash,user_id,invite,db,res){

    const sql = `START TRANSACTION; 

                    INSERT INTO users(email,hashed_password,user_id)
                    VALUES ('${email}','${hash}','${user_id}');
                        
                    DELETE FROM invites WHERE  invite = '${invite}';
                    
                    COMMIT;`


    db.query(sql,(err,result) =>{
       if(err) {
            if(err.sqlState = "2300") res.status(400).json(err)

            else throw err;

           
        }

        res.status(200).json(result);
    })
}