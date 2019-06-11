var express = require('express');
var User = require('../models/users');
var bcrypt = require('bcryptjs');

var router = express.Router();

router.post('/register', (req, res, next) => {
  var {email, password} = req.body;

  var user = new User({email, password});

  bcrypt.genSalt(10 ,(err, salt) => {
       bcrypt.hash(user.password, salt, async (err, hash) => {
            user.password = hash;

            try {
                var newUser = user.save();
                res.send(201);
            } catch(err){
                res.send(err.message());
            }
       })
  })
})

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