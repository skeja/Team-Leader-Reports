const express = require('express');

const app = express();

require('./server/models');

app.listen(process.env.PORT || 3000, () => {
  console.log('Running at 3000');
});
