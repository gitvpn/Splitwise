/**
 *  Options:

new : bool - true to return the modified document rather than the original. defaults to false
upsert : bool - creates the object if it doesn't exist. defaults to false.
runValidators : if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
setDefaultsOnInsert : if this and upsert are true, mongoose will apply the defaults specified in the model's schema if a new document is created. This option only works on MongoDB >= 2.4 because it relies on MongoDB's $setOnInsert operator.
sort : if multiple docs are found by the conditions, sets the sort order to choose which doc to update
select : sets the document fields to return
passRawResult : if true, passes the raw result from the MongoDB driver as the third callback parameter
strict : overwrites the schema's strict mode option for this update
runSettersOnQuery : bool - if true, run all setters defined on the associated model's schema for all fields defined in the query and the update. 
 */

function insert(model, data, cb) {
    model.create(data, function (error, result) {
        if (error) {
            cb(error);
        } else {
            cb(null, result);
        }
    });
}
function find(model, id, fields, options, cb) {
    var parameters = [];
    if (typeof id === 'undefined') {
        cb(new Error('search criteria not provided'));
    } else {
        parameters.push(id);
        if (typeof fields === 'string' && fields.trim().length > 0) {
            parameters.push(fields);
        }
        if (typeof options === 'object' && Object.keys(options).length > 0) {
            parameters.push(options);
        }
        parameters.push(function (error, result) {
            if (error) {
                cb(error);
            } else {
                cb(null, result);
            }
        });
        if (typeof id === 'string' || typeof id === 'number') {
            model.findById.apply(model, parameters);
        } else if (typeof id === 'object') {
            model.find.apply(model, parameters);
        }
    }
}
function update(model, selector, document, options, cb) {
    if (typeof model === 'undefined') {
        cb(new Error('Model Not Found'));
    } else if (typeof document !== 'undefined' && Object.keys(document).length == 0) {
        cb(new Error('Blank Document Provided.'));
    } else {
        var parameters = [selector, document, options, updateHandler];
        if (typeof selector === 'object') {
            model.update.apply(model, parameters);
        } else {
            model.findByIdAndUpdate.apply(model, parameters);
        }
    }
    function updateHandler(errorInUpdating, updated,dsf) {
        if (errorInUpdating) {
            cb(errorInUpdating);
        } else {
            cb(null, updated);
        }
    }
}
module.exports = {
    get : find,
    save : insert,
    update : update
};