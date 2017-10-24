var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

var data = {
  address: 'foo@example.com',
  preferences: [
    {
      name: 'daily',
      value: 'together',
    },
    {
      name: 'weekly',
      value: 'separately',
    },
  ],
  subscriptions: [
    {
      title: 'Publications from the Department for Education',
      frequency: 'daily',
      channel: 'HTML email',
    },
    {
      title: 'Spain Travel Alerts',
      frequency: 'immediately',
      channel: 'text message',
    },
  ]
}

router.get('/manage', function (req, res) {
  res.render('manage', data);
})

module.exports = router
