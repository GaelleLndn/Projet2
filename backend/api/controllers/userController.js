const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require ('../models/userModel');


// USER SIGNUP
exports.create_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then( user => {
            if (user.length >=1) {
                return res.status(409).json({
                    message: 'This email already exist'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash ) => {
                    if (err) { 
                        return res.status(500).json({
                            message: 'probleme dans le hash',
                            error: err
                        });
            
                    } else {
                        const user = new User ({
                            _id : new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log (result);
                                res.status(201).json({
                                    result: result
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    message: 'Ces identifiants ne sont pas valides'
                                })
                            })
                    }
                });
            }
        })
}


// USER LOGIN
exports.login_user = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (!user){
            return res.status(401).json({
                message: 'Ces identifiants ne sont pas valides'
            });
        } 
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Ces identifiants ne sont pas valides'
                });
            }
            if(result) {
                const token = jwt.sign (
                    { email: user.email,
                    userId: user._id }, 
                    'secret',
                    { expiresIn: '1h' }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token,
                    userId: user._id,
                    expiresIn: 3600
                });
                
            }
            res.status(401).json({
                message: 'Ces identifiants ne sont pas valides'
            });
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Ces identifiants ne sont pas valides'
        })
    })
};


// DELETE USER BY ID
exports.delete_user_by_id = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id : id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'user deleted successfully'
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
};