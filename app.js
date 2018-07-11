const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('./server/auth/');
const path = require('path');

dotenv.config();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.use(express.static(path.join(__dirname, 'dist')));

// require('./server/seed')(app);

require('./server/api')(app);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Running at 3000');
});
