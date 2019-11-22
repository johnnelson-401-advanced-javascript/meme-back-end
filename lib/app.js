const express = require('express');
const app = express();
const ensureAuth = require('./middleware/ensure-auth');


app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(require('cookie-parser')());
app.use(express.json());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/memes', ensureAuth, require('./routes/memes'));

//api 404 errors
app.use('/api', require('./middleware/api-404'));

//custom error handling
app.use(require('./middleware/error-handler'));

module.exports = app;