import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const secret = "asjdasjdqajsndjasndjasnd"

export const sign = function(payload : object) {
    jwt.sign(payload, secret, {expiresIn: 28800})
}

export const verify = function(token : string) {
    jwt.verify(token, secret)
}