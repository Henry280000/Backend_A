const asyncHandler = require('express-async-handler');
const Tarea = require('../models/tareasmodels');

const getTareas = asyncHandler(async(req, res) => {
    const tareas = await Tarea.find({user : req.user.id});
    res.status(200).json(tareas)
});

const createTareas =asyncHandler( async(req, res) => {
    if(!req.body.texto){
        res.status(400)
        throw new Error('Por favor ingresa un texto para la tarea');
    }
    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })
    res.status(200).json(tarea)

});

const updateTareas = asyncHandler(async(req, res) => {
    //checar que nuestra tarea que modificamo exista
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea){
        res.status(404);
        throw new Error('Tarea no encontrada')
    }
        //verificamos que la tarea a modificar es la del usuario logueado
        if (tarea.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('No autorizo')
        }else{
    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.status(200).jason(tareaUpdated)
}});


const deleteTareas = asyncHandler(async(req, res) => {
    //checar que la tarea exista
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea){
        res.status(404);
        throw new Error('Tarea no encontrada')
    }
    //verificamos que la tarea a modificar es la del usuario logueado

    await tarea.deleteOne();
    res.status(200).json({id: req.params.id});
});

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
};
