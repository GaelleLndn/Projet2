const mongoose = require ('mongoose');

const Log = require ('../models/logModel');
const Category= require ('../models/categoryModel');


//  SEARCH
exports.text_search = (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    const creator = req.userData.userId

    const logPromise = 
            Log.find({ 
                $and: [
                   { $text: { $search: term } },
                   { creator: creator}
                ]
            })    
                .select('—id title date categories')
                .populate('categories', 'label');
 
    const catPromise = 
        Category.find({ 
            $and: [
               { $text: { $search: term } },
               { creator: creator}
            ]
        })    
            .select('—id label logs')
            .populate('logs', 'title date');


    Promise.all( [logPromise, catPromise] )
        .then(
                docs => {     
                    const logDoc = docs[0]
                    const catDoc = docs[1]

                    const response = {
                        count_logs: logDoc.length,
                        logs: logDoc.map ( ldoc => {    
                            return { 
                                _id: ldoc._id,
                                title : ldoc.title,
                                date: ldoc.date,
                                categories : ldoc.categories 
                            }
                        }),
                        count_cats: catDoc.length,
                        categories: catDoc.map ( cdoc => {                                  
                            return { 
                                _id: cdoc._id,
                                label : cdoc.label,
                                logs: cdoc.logs
                            }
                              
                        })
                    }
            console.log (response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

