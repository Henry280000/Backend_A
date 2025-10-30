const mongoose = require('mongoose');

const tareaSchema = mongoose.Schema({
    texto: {
        type: String,
        required: [true, "Por favor ingresa un texto para la tarea"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tarea', tareaSchema);