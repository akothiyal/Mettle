var express = require('express');
var router = express.Router();
var path = require('path');
var Question = require('../models/question');
var Log = require('../models/log');
var User = require('../models/user');
var Session = require('../models/session');

router.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("no auth");
    res.status = 200;
    req.flash('error', ['please authenticate first']);
    res.send(JSON.stringify({
      status: 'redirect',
      message: '/login'
    }));
  }
});

router.get('/problem/answer/',function(req,res){
  //console.log(req.query.pageID);
 
  // var io = req.app.get('socketio');
  //   //io.emit('hi!');
  //   io.on('connection', (socket) => {
  //       console.log('a user connected');
  //     });

  var page = req.query.pageID;

    if(req.query.pageID.includes("Driver")){
        page = req.query.pageID.replace("/Driver", "");
    } else if (req.query.pageID.includes("Navigator")){
        page = req.query.pageID.replace("/Navigator", "");
    }else if (req.query.pageID.includes("role")){
      page = req.query.pageID.replace("/role", "");
    }

   Question.find({
        sessionID: req.session.session_id,
        pageID: page,
		questionID: req.query.questionID
    }, null,  {
        sort: {
            timestamp: -1,
        }
    }, function (err, result) {
        if (err || !result)  {
            res.send(
                "error"+err
            );
        } else {
            //console.log(result);
            var answers = [];

            result.forEach(function (answer) {
                answers.push(answer.questionData.value)
            }, this);
            //console.log(answers);
            res.send(JSON.stringify(
                answers)
            );
        }
    });
});

router.post('/problem/answer', function (req, res) {
  //console.log(req);

  var page = req.body.pageID;

    if(req.body.pageID.includes("Driver")){
        page = req.body.pageID.replace("/Driver", "");
    } else if (req.body.pageID.includes("Navigator")){
        page = req.body.pageID.replace("/Navigator", "");
    }

  var newQuestion = {
    sessionID: req.session.session_id,
    questionID: req.body.pk,
    pageID: page,
	/** Urfa **/timestamp: new Date(),
    questionData: {
      value: req.body.value,
    }
  }

  Question.findOneAndUpdate({
    pageID: newQuestion.pageID,
    questionID: newQuestion.questionID,
    sessionID: newQuestion.sessionID,
	timestamp: newQuestion.timestamp
  }, newQuestion, {
    upsert: true,
    new: true,
    runValidators: true
  }, function (err, result) {

    if (err) {
      console.log(err);
      res.send(JSON.stringify({
        status: 'error',
        message: err
      }))
    } else {
      res.send(JSON.stringify({
        status: 'success'
      }));
    }
  });
});

router.post('/problem/log', function (req, res) {
  console.log("in api.post problem/log");
  console.log(req.body.pageID);
  console.log(req.body.value);
  console.log(req.session.session_id);
  console.log(req.session.user);

  var page = req.body.pageID;
  var log = req.body.value;
  
  if(req.body.value.includes("role")){
    log = req.body.value.replace("/role", "");
  }

  if(req.body.pageID.includes("Driver")){
    page = req.body.pageID.replace("/Driver", "");
  } else if (req.body.pageID.includes("Navigator")){
      page = req.body.pageID.replace("/Navigator", "");
  }

  var newLog = {
    sessionID: req.session.session_id,
    pageID: page,
    roleUser1: null,
    roleUser2: null,
	  timestamp: new Date(),
	  logData: log
  }

  //if the requested url is not part of problem solving (tasks), then don't need to check for the role switching
  // fixed role switch from driver to navigator, and navigator switching in specific pages
  if(req.body.value.includes("tasks"))
  {
      //get a log to check if the roles where already given for this specific page, if yes then return those 
      //roles, if not then get the current user's role stored in db and return it
      Log.findOne({logData: newLog.logData, sessionID: newLog.sessionID,}, function (err, log){
        console.log(err + " " + log);
          if(log && log.roleUser1 != null && log.roleUser2 != null){
            Session.findById(log.sessionID, function(err, session){
              console.log("log already contains roles and requesting user is :" + req.session.user);
              User.findById(req.session.user, function (err, user) {
              var myrole = user.role;
              var role = session.userID == req.session.user ? log.roleUser1 : log.roleUser2;
              var roleUser2 = role == 'Driver' ? 'Navigator' : 'Driver';
              newLog.roleUser1 = session.userID == req.session.user ? role : roleUser2;
              newLog.roleUser2 = newLog.roleUser1 == 'Driver' ? 'Navigator' : 'Driver';
              //console.log("my current role: "+ myrole + "my next role"+ role);
              //console.log("stored roles on this page are: "+ newLog.roleUser1 + " "+ newLog.roleUser2);
              //skip the log if the role is Navigator, this avoid storing duplicates log for the two users
              if(myrole == 'Navigator'){
                //res.send(JSON.stringify({status: 'success', role: role}));
                // change navigator role to stored role
                  User.findByIdAndUpdate(req.session.user, {role: role}, function (err, usr){
                    res.send(JSON.stringify({
                      status: 'success',
                      role: role
                    })); 
                  })
              }else{
                console.log("starts log update - roles where already in log and the user was the driver");
                Log.findOneAndUpdate({
                  pageID: newLog.pageID,
                  sessionID: newLog.sessionID,
                  //roleUser1: role,
                  //roleUser2: roleUser2,
                  roleUser1: newLog.roleUser1,
                  roleUser2: newLog.roleUser2,
                  logData: newLog.logData,
                  timestamp: newLog.timestamp
                }, newLog, {
                  upsert: true,
                  new: true,
                  runValidators: true
                }, function (err, result) {
                  if (err) {
                    console.log("err : " + err);
                    res.send(JSON.stringify({
                      status: 'error',
                      message: err
                    }))
                  } else {
                    //switching driver role to stored role
                      //console.log("in result as tasks")
                      User.findByIdAndUpdate(req.session.user, {role: role}, function (err, usr){
                        res.send(JSON.stringify({
                          status: 'success',
                          role: role
                        }));
                      });
                  }
                });
              }
            });
            });
          }else{
            Session.findById(newLog.sessionID, function(err, session){
              //console.log("requesting user is :" + req.session.user);
              User.findById(req.session.user, function (err, user) {
                var currentUserRole = user.role;
                var otherUserRole = user.role == 'Driver' ? 'Navigator' : 'Driver';
                var role = session.userID == req.session.user ? currentUserRole : otherUserRole;
                var roleUser2 = role == 'Driver' ? 'Navigator' : 'Driver';
                newLog.roleUser1 = roleUser2;
                newLog.roleUser2 = role;
                console.log("log doesnt have roles");
                //console.log("Current roles on page "+role+" "+roleUser2);
                //console.log("roles on this page will be: "+ newLog.roleUser1 + " "+ newLog.roleUser2);
                if(currentUserRole == 'Navigator'){
                  User.findByIdAndUpdate(req.session.user, {role:'Driver'}, function (err, usr){
                    res.send(JSON.stringify({
                      status: 'success',
                      role: 'Driver'
                    })); 
                  })
                }
                // A log for this speciifc page does not exist yet, so we need to create it or the log
                // didnt contain the roles yet
                else{
                  console.log("starts log update");
                  Log.findOneAndUpdate({
                    pageID: newLog.pageID,
                    sessionID: newLog.sessionID,
                    //roleUser1: role,
                    //roleUser2: roleUser2,
                    roleUser1: newLog.roleUser1,
                    roleUser2: newLog.roleUser2,
                    logData: newLog.logData,
                    timestamp: newLog.timestamp
                  }, newLog, {
                    upsert: true,
                    new: true,
                    runValidators: true
                  }, function (err, result) {
                    /*console.log("************************************");
                    console.log(result.logData.includes("tasks"));
                    console.log(result.logData);
                    console.log("************************************");*/
                    if (err) {
                      console.log("err : " + err);
                      res.send(JSON.stringify({
                        status: 'error',
                        message: err
                      }))
                    } else {
                        //console.log("in result as tasks");
                        User.findByIdAndUpdate(req.session.user, {role:'Navigator'}, function (err, usr){
                        res.send(JSON.stringify({
                          status: 'success',
                          role: 'Navigator'
                        }));
                      })
                    }
                  });
                }
              });
            });
          }
      });
      // console.log(role);
      // var roleUser2 = role == 'Driver' ? 'Navigator' : 'Driver';
      // console.log(roleUser2);
      // newLog.roleUser1 = role;
      // newLog.roleUser2 = roleUser2;
    //   if(roleUser1 == 'Navigator'){
    //     if(newLog.logData.includes("tasks")){
    //       res.send(JSON.stringify({
    //         status: 'success',
    //         role: 'Driver'
    //       }));
    //     }else{
    //     res.send(JSON.stringify({
    //       status: 'success'
    //       }));
    //     }
    //   }else{
    //     console.log("starts log update");
    //     Log.findOneAndUpdate({
    //       pageID: newLog.pageID,
    //       sessionID: newLog.sessionID,
    //       roleUser1: role,
    //       roleUser2: roleUser2,
    //       logData: newLog.logData,
    //       timestamp: newLog.timestamp
    //     }, newLog, {
    //       upsert: true,
    //       new: true,
    //       runValidators: true
    //     }, function (err, result) {
    //       // console.log("************************************");
    //       // console.log(result.logData.includes("tasks"));
    //       // console.log(result.logData);
    //       // console.log("************************************");
    //       if (err) {
    //         console.log("err : " + err);
    //         res.send(JSON.stringify({
    //           status: 'error',
    //           message: err
    //         }))
    //       } else {
    //         if(result.logData.includes("tasks")){
    //           console.log("in result as tasks")
    //           res.send(JSON.stringify({
    //             status: 'success',
    //             role: 'Navigator'
    //           }));
    //         }else{
    //         res.send(JSON.stringify({
    //           status: 'success'
    //           }));
    //         }
    //       }
    //     });
    //   }
    // })
    // console.log(roleUser1);
    // var roleUser2 = roleUser1 == 'Driver' ? 'Navigator' : 'Driver';
    // console.log(roleUser2);
  }else{
    console.log("starts log update for non problem solving pages");
    //for non-ps pages log the individual user ids
    Log.findOneAndUpdate({
      pageID: newLog.pageID,
      sessionID: newLog.sessionID,
      roleUser1: null,
      roleUser2: null,
      logData: newLog.logData,
      timestamp: newLog.timestamp
    }, newLog, {
      upsert: true,
      new: true,
      runValidators: true
    }, function (err, result) {
      // console.log("************************************");
      // console.log(result.logData.includes("tasks"));
      // console.log(result.logData);
      // console.log("************************************");
      if (err) {
        console.log("err : " + err);
        res.send(JSON.stringify({
          status: 'error',
          message: err
        }))
      } else {
        // if(result.logData.includes("tasks")){
        //   console.log("in result as tasks")
        //   res.send(JSON.stringify({
        //     status: 'success',
        //     role: 'Navigator'
        //   }));
        //}else{
          User.findById(req.session.user, function (err, user) {
            var role = user.role;
            //console.log("in result as non tasks")
            res.send(JSON.stringify({
              status: 'success',
              role: role
              }));
            });
        //}
      }
    });
  }
});

// function checkURL(urlString){
//   console.log("in hello");
//   return urlString.replace("role","Driver")
// }

// function checkRole(reqPageID, reqSessionID,userID){
//   console.log("in check role");
//   Log.findOne({pageID: reqPageID, sessionID: reqSessionID,}, function (err, log){
//     console.log(err + " " + log);
//     if(log != null){
//       if(log.roleUser1 != null && log.roleUser2 != null){
//         Session.findById(log.sessionID, function(err, session){
//           console.log("log already contains roles");
//           return session.userID == userID ? log.roleUser1 : log.roleUser2;
//         });
//       }else{
//         User.findById(userID, function (err, user) {
//           console.log("log doesnt have roles");
//           return user.role;
//         });
//       }
//     }else{
//       User.findById(userID, function (err, user) {
//         console.log("log was null");
//         console.log(err);
//         return user.role;
//       });
//     }
//   });
// }

module.exports = router;
