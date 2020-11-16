import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const secret = "asjdasjdqajsndjasndjasnd"

export const sign = async(payload : object) => {
    return await jwt.sign(payload, secret, {expiresIn: 28800})
}

export const verify = async (token : string) => {
    return await jwt.verify(token, secret)
}