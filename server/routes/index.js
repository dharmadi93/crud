var express = require('express');
var router = express.Router();
var models = require('../models')
var Memos = models.Memo

/* GET home page. */
router.get('/', function(req, res, next) {
  Memos.findAll().then(function (memo) {
    res.json(memo)
  }).catch(function (err) {
    res.json({
      err: err.message
    })
  })
});

router.post('/', function (req, res) {

  // console.log("create")
  Memos.create({
    title: req.body.title,
    description: req.body.description
  }).catch(function (err) {
    res.json({
      err: err.message
    })
  }).then(function (memo) {
    res.json(memo)
  })
})

router.get('/:id', function (req, res) {
  // console.log(req.params.id)
  Memos.findOne({
    where: {
      id: req.params.id
    }
  }).catch(function (err) {
    res.json({err: err.message})
  }).then(function (memo) {
    res.json(memo)
  })
})

router.put('/', function (req, res) {
  // console.log(req.body)
  Memos.update({
    title: req.body.title,
    description: req.body.description
  }, {
    where: {
      id: req.body.id
    }
  }).catch(function (err) {
    res.json({err: err.message})
  }).then(Memos.findOne({
    where: {
      id: req.body.id
    }
  }).catch(function (err) {
    res.json({err: err.message})
  }).then(function (memo) {
    console.log(memo)
    res.json(memo)
  }))
})

router.delete('/:id', function (req, res) {
  Memos.destroy({
    where: {
      id: req.params.id
    }
  }).catch(function (err) {
    res.json({
      err: err.message
    })
  }).then(function (memo) {
    res.json("Data deleted")
  })
})

module.exports = router;
