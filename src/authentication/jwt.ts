import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const secret = "asjdasjdqajsndjasndjasnd"

export const sign = (payload : object) => {
    return jwt.sign(payload, secret, {expiresIn: 28800})
}

export const verify = (token : string) => {
    return jwt.verify(token, secret)
}