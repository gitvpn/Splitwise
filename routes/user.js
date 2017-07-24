var path = require('path');
var express = require('express');
var dao = require('../utils/dao.js');
/** import models */
var userModel = require(path.join(__dirname,'..','models','user.js'));

module.exports = function(app){
    var router = express.Router({
        'caseSensitive':true
    });
    /**
     * Get all users
     */
    router.get('/',function(req,res){
        dao.get(userModel,{},'',{},function(err,users){
            if(err){
                res.send(err);
            } else {
                res.json(users);
            }
        });
    });
    /**
     * Get user By Id
     */
    router.get('/:id',function(req,res){
        dao.get(userModel,req.params.id,'',{},function(error,userById){
            if(error){
                res.send(error);
            } else {
                res.json(userById);
            }
        });
    });
    /**
     * Update user by id
     */
    router.post('/:id',function(req,res){
        /** passing options {new : true} will make the call return the updated document */
        dao.update(userModel,{_id:req.params.id},req.body,{new : true},function(error,userUpdated){
            if(error){
                res.send(error);
            } else {
                res.json(userUpdated);
            }
        });
    });
    app.use('/users',router);
};