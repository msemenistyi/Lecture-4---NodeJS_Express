const router = require('express').Router();
const db = require('../../services/user');

router.get('/', (req, res, next) => {
  db.findAll((err, data) => {
    if (!err){
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.get('/:id', (req, res, next) => {
  db.findOne( Number(req.params.id), (err, data) => {
    if (!err){
      res.data = data;
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});


router.post('/', (req, res, next) => {
  const obj = req.body;
  db.add( obj, (err, data) => {
    res.end();
  });
});


router.delete('/:id', (req, res, next) => {
  db.findOneAndDelete( Number(req.params.id), (err, data) => {
    if (!err){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
});

router.put('/:id', (req, res, next) => {
  const obj = req.body;
  db.findOneAndUpdate( Number(req.params.id), obj, (err, data) => {
    if (!err){
      res.json(res.data);
    } else {
      res.status(400);
      res.end();
    }
  });
  
});

module.exports = router;