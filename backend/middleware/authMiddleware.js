const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //obtengo el token
            token = req.headers.authorization.split(' ')[1]
            //verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario desde el token 
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('No autorizado, token invalido')
        }
    } else {
        res.status(401)
        throw new Error('No autorizado, no hay token')
    }
})

module.exports = {protect}
