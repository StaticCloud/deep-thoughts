// require jwt
const jwt = require('jsonwebtoken');

require('dotenv').config();

// secret and expiration
// remember, a secret enables the server to verify whether it recognizes the token
const secret = process.env.SECRET;
const expiration = '2h';

module.exports = { 
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        // allows token to be sent via req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        // separate bearer from tokenvalue
        if (req.headers.authorization) {
            token = token
                    .split(' ')
                    .pop()
                    .trim();
        }

        // return req as is if no token
        if (!token) {
            return req;
        }

        try {
            // decode user data to a req object
            const { data } = jwt.verify(token, secret, { maxAge: expiration })
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return updated request object
        return req;
    }
};