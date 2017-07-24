var express = require('express');
var path = require('path');
var dao = require('../utils/dao.js');
var userModel = require('../models/user.js');
/** include mounted routes */
var userRoutes = require(path.join(__dirname,'user.js'));
var userGroupRoutes = require(path.join(__dirname,'user-group.js'));


module.exports = function (app,passport) {
  
  app.post('/login',
    passport.authenticate('local-login', {
        failureRedirect : '/loginFailure'
    }),
    function(req,res){
      dao.get(userModel,{email:req.body.email},'',{},function(error,result){
        if(error){
          res.send(error);
        } else {
          res.json(result)
        }
      });
    }
  );
  app.get('/loginFailure', function(req, res) {
      res.status(500).send({success:false,message:'Invalid Login Credentials.'});
  });
  app.post('/register',function(req,res,next){
    dao.save(userModel,req.body,function(error,result){
      if(error){
        res.send(error);
      } else {
        res.json(result)
      }
    });
  });
  userRoutes(app);
  userGroupRoutes(app);
  /* GET home page. */
  app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'app', 'index.html'));
  });
};
