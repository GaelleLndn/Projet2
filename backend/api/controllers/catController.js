const mongoose = require('mongoose')

const Category = require ('../models/categoryModel');
const Log = require ('../models/logModel');


// GET ALL CATEGORIES
exports.cat_get_all = (req, res, next) => {
    creator = req.userData.userId;
    Category.find({creator})
    .select("_id label logs creator createdAt updatedAt")
    .populate('logs', 'title date')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length, 
            categories: docs.map(doc => { 
                return {
                    _id : doc._id,
                    label : doc.label,
                    logs : doc.logs,
                    creator: doc.creator,
                    createdAt: doc.createdAt,
                    updatedAt: doc.updatedAt,
                    request : {
                       type: 'GET',
                       url: 'http://localhost:8000/categories/' + doc._id
                   }
               }
           })
       }

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
}



// CREATE CATEGORY
exports.cat_create_category = (req, res, next) => {
    Category.find({ label: req.body.label })
    .exec()
    .then( category => {
        if (category.length >=1) {
            return res.status(409).json({
                message: 'This category already exist'
            })
        } else {
            const category = new Category({
                _id : new mongoose.Types.ObjectId(),
                label: req.body.label,
                logs: req.body.logs,            
                creator: req.userData.userId

            });
            category.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message:'Created category successfully',
                    createdCategory: {
                        _id : result._id,
                        label : result.label,
                        logs : result.logs,
                        creator: result.creator

                    },
                    request : {
                        type: 'GET',
                        url: 'http://localhost:8000/categories/' + result._id
                    } 
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }
    });
}



// GET CATEGORY BY ID
exports.cat_get_category_by_id = (req, res, next) => {
    const _id = req.params.categoryId;
    const creator = req.userData.userId;
    Category.findOne({
        $and: [
               { _id : _id},
               { creator: creator}
             ]
      })
    .select('_id label logs')
    .populate('logs', 'title date')
    .exec()
    .then(category => {
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        res.status(200).json({
            category: category,
            request: {
                type: 'GET',
                description: 'Get all categories',
                url: 'http://localhost:8000/categories'
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ 
            error : err, 
            message: "This ID is not valid"
        })
    });  
}


// GET CATEGORY BY LABEL
exports.cat_get_category_by_label = (req, res, next) => {
    const label = req.params.label;
    const creator = req.userData.userId;
    Category.findOne({
        $and: [
               { label : label},
               { creator: creator}
             ]
      })
    .select('_id label logs')
    .populate('logs', 'title date')
    .exec()
    .then(category => {
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        }
        res.status(200).json({
            category: category,
            request: {
                type: 'GET',
                description: 'Get all categories',
                url: 'http://localhost:8000/categories'
            }
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ 
            error : err, 
            message: "This label is not valid"
        })
    });  
}



// UPDATE CATEGORY BY ID
exports.cat_update_category_by_id = (req, res, next) => {
    const _id = req.params.categoryId;
    
    Category.update({ _id : _id, creator: req.userData.userId }, {$set: req.body } )
    .exec()
    .then (result => {
        if (result.nModified === 0) {
            res.status(401).json({
                message: '************* Not the log creator ************** !'
            })
        }

        res.status(200).json({
            message: 'Category updated successfully',
            request: {
                type: 'GET',
                url: 'http://localhost:8000/categories/' + _id
            }
        });
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


// DELETE CATEGORY BY ID
exports.cat_delete_category_by_id = (req, res, next) => {
    const _id = req.params.categoryId;
    const creator= req.userData.userId;
    Category.remove({
        $and: [
               { _id : _id},
               { creator: creator}
             ]
      })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'category deleted successfully',
            request: {
                type: 'POST',
                url: 'http://localhost:8000/categories/',
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}


