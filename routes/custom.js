var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/intro', function(req, res, next) {
    var messages = req.flash('error');
    res.render('intro', { errorOccured: messages.length > 0, errors: messages });
  });

router.get('/logout', function(req, res, next) {
    console.log("logging out");
    req.logOut();
    res.redirect('/');
});


module.exports = router;
