const express = require('express');
const app = express();
const ensureAuth = require('./middleware/ensure-auth');

app.use(require('cookie-parser')());
app.use(express.json());

app.use(require('cors')({
  origin: true,
  credentials: true
}));

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const memes = require('./routes/memes');
app.use('/api/memes', ensureAuth(), memes);

//api 404 errors
const api404 = require('./middleware/api-404');
app.use('/api', api404);

//custom error handling
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;