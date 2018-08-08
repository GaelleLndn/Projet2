const mongoose = require ('mongoose');

const Log = require ('../models/logModel');
const Category= require ('../models/categoryModel');


//  SEARCH
exports.text_search = (req, res) => {
    const term = req.params.term.toLowerCase().trim();

    const logPromise = new Promise ((resolve, reject ) => {
        resolve (
            Log.find( { $text: { $search: term } } )    
                .select('—id title date categories')
                .populate('categories', 'label')
        )
    })
    
    const catPromise = new Promise ((resolve, reject ) => {
        resolve (
            Category.find( { $text: { $search: term } } )    
                .select('—id label logs')
                .populate('logs', 'title')
        )
    })

    Promise.all([logPromise, catPromise])
        .then( docs => { console.log('DOCS DE PROMISE', docs)
            // const response = {
            //     count: docs.length,
            //     logs: docs.map(doc => {
            //         return {
            //             _id: doc._id,
            //             title: doc.title,
            //             date: doc.date,
            //             categories: doc.categories,
            //             createdAt: doc.createdAt,
            //             updatedAt: doc.updatedAt,
            //             request: {
            //                 type: 'GET',
            //                 url: 'http://localhost:8000/logs/' + doc._id
            //             }
            //         }
            //     })
            // }
            // res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

