var express = require('express');
var router = express.Router();
var models = require('../models')
var Memos = models.Memo

/* GET home page. */
router.get('/', function(req, res, next) {
  Memos.findAll().then(function (memo) {
    res.render('index', { title: 'Memo', memo: memo });
  }).catch(function (err) {
    res.json({
      err: err.message
    })
  })
});

router.post('/api/createMemo', function (req, res) {

  console.log("create")
  // Memos.create({
  //   title: req.body.title,
  //   description: req.body.description
  // }).catch(function (err) {
  //   res.json({
  //     err: err.message
  //   })
  // }).then(function (memo) {
  //   res.json({
  //     status: "Data Inserted",
  //     memo: memo
  //   })
  // })
})

router.get('/api/getUpdate/:id', function (req, res) {
  // console.log(req.params.id)
  Memos.findOne({
    where: {
      id: req.params.id
    }
  }).catch(function (err) {
    res.json(err.message)
  }).then(function (memo) {
    res.json({
      memo:memo
    })
  })
})

router.put('/api/updateMemo', function (req, res) {
  // console.log(req.body)
  Memos.update({
    title: req.body.title,
    description: req.body.description
  }, {
    where: {
      id: req.body.id
    }
  }).catch(function (err) {
    res.json(err.message)
  }).then(function (memo) {
    // console.log(memo)
    res.json({
      status: "Data updated",
      memo: req.body
    })
  })
})

module.exports = router;
