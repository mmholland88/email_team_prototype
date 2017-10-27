var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

var data = {
  address: 'foo@example.com',
  digests: {
    daily: "separately",
    weekly: "combined",
  },
  subscriptions: [
    {
      id: 1,
      title: 'Publications from the Department for Education',
      url: "https://example.com/subscription-1",
      frequency: 'daily',
    },
    {
      id: 2,
      title: 'Spain Travel Alerts',
      url: "https://example.com/subscription-2",
      frequency: 'immediately',
    },
  ]
}

router.get('/manage', function (req, res) {
  res.render('manage', data);
})

router.get('/manage-2', function (req, res) {
  res.render('manage-2', data);
})

router.get('/edit', function (req, res) {
  var subscription;
  for (var i = 0; i < data.subscriptions.length; i += 1) {
    if (data.subscriptions[i].id.toString() === req.query.id) {
      subscription = data.subscriptions[i];
    }
  }
  res.render('edit', subscription);
})

module.exports = router
