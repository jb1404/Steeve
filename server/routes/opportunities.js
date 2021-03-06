const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Opportunity = require('../models/opportunity');
const Note = require('../models/note');
const passport = require('passport');
const config = require('../config');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'my-images',
  allowedFormats: ['jpg', 'png', 'gif'],
});

const parser = multer({ storage });



//get all opps/user
router.get('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  Opportunity.find({owner:req.user._id}).populate('notes')  
  .then(opps => {
    res.json(opps)
  })
});

// //Update all opps
// router.get('/', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
//   Opportunity.find({owner:req.user._id})
//   .then(opps => {
//     Opportunity.save
//     res.json(opps)
//   })
// });


//create a new opp 
router.post('/:id/opportunity', passport.authenticate("jwt", config.jwtSession), (req, res, next) => {
  const newOpportunity = new Opportunity(req.body)
  // console.log(req.body)
  newNote.save( (err, doc) => { 
    // console.log('erreur', err);
    // console.log('note',doc)
    if (err) 
    return res.status(500).send(err);
    // console.log(err);
    res.json({_id: doc._id})
  });
});




module.exports = router;