import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const secret = "$2y$12$M4z9XReZpu1T2i98Rl9gCevfrGd95aDpcwkh6zUzj00PESY13LAd2"

export const sign = async(payload : object) => {
    return await jwt.sign(payload, secret, {expiresIn: 28800})
}

export const verify = async (token : string) => {
    return await jwt.verify(token, secret)
}