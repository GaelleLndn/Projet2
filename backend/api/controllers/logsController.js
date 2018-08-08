const mongoose = require ('mongoose');

const Log = require ('../models/logModel');
const Category = require ('../models/categoryModel');


// GET ALL LOGS
exports.logs_get_all = (req, res, next) => {
    Log.find()
    .select('_id title date categories createdAt updatedAt')
    .populate('categories', 'label')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            logs: docs.map(doc => {
                return {
                    _id: doc._id,
                    title: doc.title,
                    date: doc.date,
                    categories: doc.categories,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/logs/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
};


// CREATE LOG
exports.logs_create_log = (req, res, next) => {
    Category.findById(req.body.categories)
    .then(category => {
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            })
        };

        const log = new Log ({
            _id: mongoose.Types.ObjectId(),
            title : req.body.title,
            date: req.body.date,
            categories: req.body.categories,
        });
        return log.save()
    })    
    .then( result => {
        const createdLog = {      
            _id: result._id,
            title: result.title,
            date: result.date,
            categories: result.categories,
        }
        res.status(201).json({
            message: 'log saved',
            createdLog: result,
            request: {
                type: 'GET',
                url: 'http://localhost:8000/logs/' + result._id
            }
        })
        return createdLog
    })
    .then (result => {
        const logId = result._id;
        const catIds = result.categories
        return Category.update( 
            { _id: {$in:catIds} }, 
            { $push: { logs: logId } }, 
            { multi: true } 
        )
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};


// GET LOG BY ID
exports.logs_get_log_by_id = (req, res, next) => {
    const id = req.params.logId;
    Log.findById(id)
    .select('—id title date categories')
    .populate('categories', 'label')
    .exec()
    .then( log => {
        if(!log) {
            return res.status(404).json({
                message: "log not found"
            })
        }
        res.status(200).json({
            log: log,
            request: {
                type: 'GET',
                description: 'Get all logs',
                url: 'http://localhost:8000/logs/'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: "This ID is not valid"
        })
    })
};


// UPDATE LOG BY ID
exports.logs_update_log_by_id = (req, res, next) => {
    const _id = req.params.logId;
    const logUpdated = {      
        _id: _id,
        title: req.body.title,
        date: req.body.date,
        categories: req.body.categories     
    }
    Log.update({ _id : _id}, {$set: req.body })
    .exec()
    .then (result => {       
        console.log(result);
        res.status(200).json({
            message: 'Log updated successfully',
            request: {
                type: 'GET',
                url: 'http://localhost:8000/logs/' + _id
            }
        })
    return logUpdated
    })
    .then( result => {
        const logId = result._id;
        console.log('LOGID', logId)
        const catIds = result.categories
        return Category.update( 
            {},
            { $pull: { logs: logId  } }, 
            { multi: true } 
        ).then ( result => {
            return Category.update( 
                { _id: {$in:catIds} },
                { $push: { logs: logId } } ,
                { multi: true }
            )
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};





// DELETE LOG BY ID
exports.logs_delete_log_by_id = (req, res, next) => {
    const id = req.params.logId;
    Log.remove({_id: id})
    .exec()
    .then( result => {
        res.status(200).json({
            message: 'Log deleted successfully',
            request: {
                type: 'POST',
                url: 'http://localhost:8000/logs/',
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
};

