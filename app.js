const express = require('express');

const app = express();

require('./server/models');
require('./server/seed/seed');

app.listen(process.env.PORT || 3000, () => {
  console.log('Running at 3000');
});
