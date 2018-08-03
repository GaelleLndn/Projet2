const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



//CONNECT TO THE DATABASE
mongoose.connect('mongodb://GaelleM:S1mplon@ds129541.mlab.com:29541/mementodb', { useNewUrlParser: true })
    .then(() => {
        console.log('connected to database')
    })
    .catch(() => {
        console.log('connection to database failed')
    }); 
mongoose.set('debug', true); //permet d'avoir le détail des opérations directement dans la console
mongoose.Promise = global.Promise;
    
const Post = require('./models/postModel')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // la requête peut venir de n'impporte quelle url
    res.setHeader( 
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept, Authorization "
    );
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({})
    };
    next();
})



app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
    .then(createdPost => {
        res.status(201).json({
            message: "post added",
            postId: createdPost._id
        });
    });
    
})

app.get("/api/posts", (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'posts fetched',
                posts: documents
            });
        });
})


app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then( result => {
            console.log(result);
            res.status(200).json({
                message: "post deleted"
            });
        })
})

module.exports = app
