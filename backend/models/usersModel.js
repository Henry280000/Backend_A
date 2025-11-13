const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "Por favor escribe tu nombre"]
    },
    password:{
        type: String,
        required: [true, "Por favor escribe tu contraseña"]
    },
    email:{
        type: String,
        required: [true, "Por favor escribe tu email"],
        unique: true
    },
    admin:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('User', userSchema);