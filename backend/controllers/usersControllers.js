const jwt = require('jsonwebtoken')
const  bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const login = asyncHandler (async(req, res)=> {
    res.status(200).json({message: 'login'})
})
const register =asyncHandler( async(req, res)=> {
    const {nombre, email, password} = req.body;
    //se descructura para evitar el estar poniendo req.body = nombre y asi  e ir directo a poner lo que necesito 
    if(!nombre || !email ||!password){
        res.status(400);
        throw new Error('Por favor ingresa todos los campos')
    }
    const userExist = await User.findOne({email});
    if (userExist){
        res.status(400);
        throw new Error('El usuario ya existe');
    }else {
        //se agrega el hash al password
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        //se crea el usuario
        const user = await User.create({
            nombre,
            email,
            password: passwordHashed
        })
        //si el usuario se creo bien se mostrara
        if (user){
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email
            })
        }else {
            res.status(400)
            throw new Error('Error al crear el usuario')
        }
    }
})
const data = asyncHandler(async(req, res)=> {
    res.status(200).json({message: 'data'})
})

module.exports = {
    login,
    register,
    data
}