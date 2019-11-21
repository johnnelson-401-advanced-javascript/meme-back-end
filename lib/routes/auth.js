const { Router } = require('express');
const User = require('../model/User');

module.exports = Router()

  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User
      .create({ username, password })
      .then(user => {
        res.cookie('session', user.token());
        res.send(user);
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { username, password } = req.body;
    User
      .findOne({ username })
      .then(user => {
        if(!user || !user.compare(password)) {
          // send some error message
          const err = new Error('Invalid Credentials');
          err.status = 401;
          throw err;
        }
        res.cookies('session', user.token());
        res.send(user);
      })
      .catch(next);
  });