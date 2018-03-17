const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
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

// router.post('/signup', parser.single('picture'), (req, res, next) => {
router.post('/signup', (req, res, next) => {
  // extract the info we need from the body
  // of the request
  console.log("DEBUG req.body", req.body)
  const { email, lastName, password } = req.body;
  const { file } = req;
  const user = new User({
   email,
    lastName
  });

  User.register(user, password, err => {
    if (err) return next(err);
    res.json({ success: true });
  });
});

router.post('/login', (req, res, next) => {
  const authenticate = User.authenticate();
  const { email, password } = req.body;
  // check if we have a email and password
  if (email && password) {
    // test if the credentials are valid
    authenticate(email, password, (err, user, failed) => {
      if (err) {
        // an unexpected error from the database
        return next(err);
      }
      if (failed) {
        // failed logging (bad password, too many attempts, etc)
        return res.status(401).json({
          error: failed.message,
        });
      }
      if (user) {
        // success!! Save the user id
        // NEVER save the password here
        // the id is usually enough because we can get back
        // the actual user by fetching the database later
        const payload = {
          id: user.id,
        };
        // generate a token and send it
        // this token will contain the user.id encrypted
        // only the server is able to decrypt it
        // for the client, this is just a token, he knows that
        // he has to send it
        const token = jwt.encode(payload, config.jwtSecret);
        res.json({
          token,
          name: user.name,
          // picture: user.picture,
        });
      }
    });
  } else {
    // unauthorized error
    res.sendStatus(401);
  }
});

module.exports = router;