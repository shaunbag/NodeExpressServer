const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, VerifyErrors } from 'jsonwebtoken';


const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']

    if(!token){
        return res.status(403).json({ message: 'No Auth Token Provided'})
    }

    const tokenWithoutBearer = token.split(' ')[1]

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (error: VerifyErrors |null, decoded: JwtPayload | string | undefined) => {
        if(error){
            return res.status(401).json({ message: 'Invalid or Expired Token'})
        }

        // decoded is safe to use here once you check it's an object
        if (decoded && typeof decoded === 'object') {
            req.user = decoded // user has bee define don the Request type in /types/expres.d.ts
        }
        next()
    })
}

const generateToken = (user: User) => {
    return jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, { expiresIn: '1h' })
}

module.exports = {authMiddleWare, generateToken};