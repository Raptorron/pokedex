const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.use('/api', require('./api'));

db.syncAndSeed()
  .then(()=> app.listen(port, console.log(`listening on port ${port}`)))
