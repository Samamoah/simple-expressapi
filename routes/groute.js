var express = require('express');
var Genre = require('../models/genres');

var router = express.Router();

router.get('/genres', (req, res,) => {
    
    Genre.find({})
    .then(genres =>{
        res.json({
            confirmation : 'success',
            data: genres
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