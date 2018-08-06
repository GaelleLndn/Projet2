const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
const morgan = require('morgan');
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


// LOGGING REQUESTS IN THE TERMINAL
app.use(morgan('dev'))
    
const Post = require('./models/postModel')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.use(cors())


// CORS HANDLING
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

app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'post updated',

            })
        })
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


// SETTING ROUTES FROM SEVER TO THE API
const categoriesRoutes = require('./api/routes/categoriesRoutes')
const logsRoutes = require('./api/routes/logsRoutes')
const usersRoutes = require('./api/routes/usersRoutes')

app.use('/categories', categoriesRoutes);
app.use('/logs', logsRoutes);
app.use('/user', usersRoutes);


//Catch all other routes and return to the index file
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, '/dist/index.html'));
 })

// HANDLING ERRORS
app.use((req, res, next) => {
    error = new Error ('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status (error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    })
})


module.exports = app
