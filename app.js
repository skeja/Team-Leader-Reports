const express = require('express');
const app = express();
const passport = require('./server/auth/');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
dotenv.config();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.use(express.static(path.join(__dirname, 'dist')));

const seedDb = require('./server/seed');
seedDb();

require('./server/api')(app);

app.listen(process.env.PORT || 3000, () => {
  console.log('Running at 3000');
});
