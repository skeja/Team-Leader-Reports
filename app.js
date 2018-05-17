const express = require('express');
const app = express();

const seedDb = require('./server/seed');
seedDb();

app.listen(process.env.PORT || 3000, () => {
  console.log('Running at 3000');
});
