const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const jwt = require('jsonwebtoken');
const config = require('../config');
const ejwt = require('express-jwt');

const router = express.Router();

router.post('/register', (req, res, next) => {
  const {email, password} = req.body;

  const user = new User({email, password});

  bcrypt.genSalt(10 ,(err, salt) => {
       bcrypt.hash(user.password, salt, async (err, hash) => {
            user.password = hash;

            try {
                const newUser = await user.save();
                res.send(201);
            } catch(err){
                res.send(err.message());
            }
       })
  })
})

router.post('/login', async (req, res, next) => {
    var {email, password} = req.body;

    try{

        var user = await auth.authenticate(email, password);
    
        var token = jwt.sign(`${user}`, config.SECRET_KEY);

        var {iat} = jwt.decode(token);
        
        res.json({iat, token});

        next();

    }catch(err){
        return next(err);
    };


  });

router.get('/users', (req, res, next) => {
    
    User.find({})
    .then(users =>{
        res.json({
            confirmation : 'success',
            data: users
        })
    })
    .catch(err => {
        res.json({
            confirmation : 'fail',
            message : err.message
        })
    });
  })

module.exports = router;