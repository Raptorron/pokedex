const app = require('express').Router();

const db = require('./db');

app.get('/pokemon', (req, res, next)=>{
  db.models.Pokemon.findAll()
    .then(pokemon => res.send(pokemon))
    .catch(next)
})

app.get('/type', (req, res, next)=>{
  db.models.Type.findAll()
    .then(type => res.send(type))
    .catch(next);
});

module.exports = app;
