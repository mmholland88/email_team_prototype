var express = require('express');
var router = express.Router();

var createSubscription = function (request) {
  var subscriptions = request.session.data.subscriptions || [];

  var params = request.query;
  var nextId = subscriptions.length + 1;

  var subscription = {
    id: nextId,
    title: params.title,
    url: params.url,
  };

  subscriptions.push(subscription);

  request.session.data.subscriptions = subscriptions;
  request.session.data[nextId + "-frequency"] = params.frequency;
};

var findSubscription = function (request) {
  var subscriptions = request.session.data.subscriptions || [];
  var id = parseInt(request.query.id, 10);

  var subscription;
  for (var i = 0; i < subscriptions.length; i += 1) {
    if (subscriptions[i].id === id) {
      subscription = subscriptions[i];
    }
  }

  return JSON.parse(JSON.stringify(subscription));
};

var setEmailAddress = function (request) {
  var address = request.query.address;
  request.session.data.address = address;
};

// Route index page
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/manage', function (req, res) {
  res.render('manage');
});

router.get('/manage-2', function (req, res) {
  res.render('manage-2');
});

router.get('/edit', function (req, res) {
  var subscription = findSubscription(req);
  res.render('edit', subscription);
});

router.get('/create', function (req, res) {
  createSubscription(req);
  setEmailAddress(req);

  res.redirect('/manage');
});

module.exports = router;
