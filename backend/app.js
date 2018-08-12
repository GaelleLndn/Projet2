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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//app.use(cors())


// CORS HANDLING
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // la requête peut venir de n'impporte quelle url
    res.setHeader( 
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({})
    };
    next();
})


// SETTING ROUTES FROM SEVER TO THE API
const categoriesRoutes = require('./api/routes/categoriesRoutes')
const logsRoutes = require('./api/routes/logsRoutes')
const userRoutes = require('./api/routes/userRoutes')
const searchRoutes = require('./api/routes/searchRoutes')

app.use('/categories', categoriesRoutes);
app.use('/logs', logsRoutes);
app.use('/user', userRoutes);
app.use('/search', searchRoutes)


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
