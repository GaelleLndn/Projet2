const jwt = require('jsonwebtoken')



module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret');
        console.log('decodedToken', decodedToken)
        req.userData = { email: decodedToken.email, userId: decodedToken.userId};
        console.log('req.userData', req.userData)

        next();
    } catch (error) {
        return res.status(401).json ({
            message: 'Auth failed'
        });
    }
};