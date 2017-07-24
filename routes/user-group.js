var path = require('path');
var express = require('express');
var dao = require('../utils/dao.js');
/** import models */
var userModel = require(path.join(__dirname,'..','models','user.js'));
var userGroupModel = require(path.join(__dirname,'..','models','user-group.js'));
var userGroupMappingModel = require(path.join(__dirname,'..','models','user-group-mapping.js'));

module.exports = function(app){
    var router = express.Router({
        'caseSensitive':true
    });
    /** 
     * Get all user groups
     */
    router.get('/',function(req,res){
        dao.get(userGroupModel,{},'',{},function(error,result){
            if(error){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    });
    /**
     * Add a user group
     */
    router.post('/',function(req,res){
        var createUserGroup = new Promise(function(resolve,reject){
            dao.save(userGroupModel,req.body,function(error,groupCreated){
                if(error){
                    reject(error);
                } else {
                    resolve(groupCreated);
                }
            });
        });
        createUserGroup
        .then(
            function(groupCreated){
                /**
                 * create user - group mapping
                 */
                return new Promise(function(resolve,reject){
                    dao.save(userGroupMappingModel,{'userGroupId':groupCreated._id,'groupMembers':[]},function(error,mappingCreated){
                        if(error){
                            reject(error);
                        } else {
                            resolve(groupCreated);
                        }
                    });
                });
            },
            function(error){
                return Promise.reject(error);
            }
        )
        .then(
            function(result){
                res.json(result);
            },
            function(error){
                res.send(error);
            }
        );
    });
    /**
     * add a user to group
     */
    router.post('/:id/users/:userId',function(req,res){
        var addUserToGroup = new Promise(function(resolve,reject){
            dao.get(userGroupMappingModel,req.params.id,'',{},function(err,userGroupMapping){
                if(err){
                    reject(err);
                } else if(!userGroupMapping) {
                    reject(new Error('This group does not exist.'));
                } else {
                    userGroupMapping.groupMembers.push(req.params.userId);
                    userGroupMapping.update(userGroupMappingModel,req.params.id,userGroupMapping,{},function(error,userAdded){
                        if(error){
                            reject(error);
                        } else {
                            resolve(userAdded);
                        }
                    });
                }
            });
        });
        addUserToGroup.then(
            function(response){
                /** increase group user count */
                dao.update(userGroupModel,req.params.id,{ $inc : { numberOfUsers : 1 } },{},function(error,countIncreased){
                    if(error){
                        res.send(error);
                    } else {
                        res.json(countIncreased);
                    }
                });
            },
            function(error){
                res.send(error);
            }
        );
    });
    app.use('/userGroups',router);
};