var express = require('express');
var router = express.Router();
var util = require('util');
var passport = require('passport');
var sessionvar = require('../models/session');
var uservar = require('../models/user');
const { Session } = require('inspector');
//import { session } from 'passport';

function isAlreadyAuth (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('session',{uname:req.user.name});
  } else {
     res.redirect('../login');
  }
};

router.get('/',isAlreadyAuth, function (req, res, next) {
  
  res.render('session',{uname:req.user.uname});
});

// 

// router.post('/data', passport.authenticate('local.newsession',{ failureRedirect: '/error' }),
//   function(req, res) {
//     res.redirect('../problems');
//   }); 
  // {
//   successRedirect: '../problems',
//   failureRedirect: '/session',
//   failureFlash: true,
// }));

router.post('/data', function(req,res,done){
    var messages = req.flash('error');
    var title = req.body.group;
    //console.log(group);
    console.log("************IN SESSION/DATA***********");

    // Verify that the group is not already existing in the database
    // await sessionvar.findOne({ name: group}, function(err ,result){
    // });
    sessionvar.findOne({ name: title}, function (err, session) {
      
      console.log(req.user.id);
      console.log(title);
    
      //check if a session matching the giving token was found
      if (session != null) {
        console.log(session.name);
        //check if the session is already full (2 users)
        if(session.userID != null && session.userID2 != null){
          //check if current user is already in this group, if yes redirect with message
          if(session.userID == req.user.id || session.userID2 == req.user.id){
            console.log("You already created this group you silly goose!");
            res.redirect('/session?e=' + encodeURIComponent('group_already_created'));
          }
          //if user not in this group, redirect with error message
          else{
            console.log("Group exist already");
            res.redirect('/session?e=' + encodeURIComponent('group_exist'));
          }
          
        }
        //check if session is partially full
        else if(session.userID == null ? !session.userID2 == null : session.userID2 == null){
          //check if current user is already in this session, if yes redirect to waiting ? 
          if(session.userID == req.user.id || session.userID2 == req.user.id){
            console.log("Well you gotta wait buddy!");
            res.redirect('/session?e=' + encodeURIComponent('group_waiting'));
          }
          //if user not in partially full session, add him and verify other user is logged
          else{
            if(session.userID2 == null){
              session.userID2 = req.session.user;
              session.save(function (err, result){
                if (err) {
                  console.log(err);
                  res.redirect('/session');
                } else {
                  uservar.findByIdAndUpdate(req.session.user,{role: 'Navigator'}, {new: true} , function (err, result2) {
                    console.log("compeleting session " + result + "\n" + result2);
                    console.log("new role saved");
                    console.log("session now is : " + req.session.session_id + "but is gonna be : " + session._id);
                    req.session.session_id = session._id;
                    console.log("session now is : " + req.session.session_id);
                    res.redirect('/roles'); //waiting room ? 

                  //res.redirect('/problems'); //waiting room
                  //res.redirect('/problem/1/tasks/problems');
                  });
                }
            });
            }else{ //this should normally never happen, as an already created session would have userID1 set
              session.userID = req.session.user;
              session.save(async function (err, result){
                if (err) {
                  console.log(err);
                  res.redirect('/session');
                } else {
                    role(req.session.user,'Navigator');
                    console.log("saving additional user in session"+result + uservar);
                    //res.redirect('/problems'); //waiting room?
                    //res.redirect('/problem/1/tasks/problems');
                    res.redirect('/roles');
                }
              });
            }
          }
        }
          
      }
      //if session not already created and title not null, create new session
      else if(title!=null){ 
        console.log("Session" + req.session.user);
        var newSession = new sessionvar();
        newSession.name = title;
        newSession.timestamp = new Date();
        newSession.userID = req.session.user;
        newSession.userID2 = null;
        newSession.save(function (err, result) {
          if (err) {
            console.log(err);
            res.redirect('/session');
          } else {
            //uservar.findByIdAndUpdate(req.session.user,{name: 'Driver'});
            uservar.findByIdAndUpdate(req.session.user,{role: 'Driver'}, {new: true} , function (err, result2) {
              console.log("saving new session "+result2);
              console.log("new role saved");
            req.session.session_id=newSession.id;
            res.redirect('/roles'); //waiting room ? 
            });
          }
        });
      }
    
    });
    //var result = sessionvar.findOne({ name: title});
    //result.then(function (doc) {console.log(doc)});
});

router.get('/data',function(req,res){
    var messages = req.flash('error');
  //res.redirect('/problems');//, { errorOccured: messages.length > 0, errors: messages });
  res.redirect('/problem/1/problemdescrip');
});

function role(id,role){
  uservar.findByIdAndUpdate(id,{role: role});
  console.log("new role saved");
}




// router.get('/session_sg', function(req, res, next) {
//  var messages = req.flash('error');
//  res.render('session');
// });


module.exports = router;