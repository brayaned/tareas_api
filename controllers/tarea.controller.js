import { tareaModel } from "../models/tarea.model.js";

const register = async(req, res) => {
    try{
        console.log(req.body)
        const {titulo, descripcion, comentarios, estado, estado_tablero} = req.body


        const newTarea = await tareaModel.create({ titulo, descripcion, comentarios, estado, estado_tablero})


        return res.status(201).json({
            ok: true,
            newTarea
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const findOneById = async(req, res) => {
    try{
        const { id } = req.params
        const tarea = await tareaModel.findOneById(id)

        return res.status(200).json({
            ok: true,
            data: tarea
        })
    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}


const findAll = async(req, res) => {
    try{
        const tareas = await tareaModel.findAll()

        return res.status(200).json({
            ok: true,
            data: tareas
        })
    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const update = async(req, res) => {
    try{
        const {id, titulo, descripcion, comentarios, estado, estado_tablero} = req.body
        const tarea = await tareaModel.update({id, titulo, descripcion, comentarios, estado, estado_tablero})

        return res.status(200).json({
            ok: true,
            data: tarea
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const inactivate = async(req, res) => {
    try{
        const { id } = req.params
        const tarea = await tareaModel.inactivate(id)
        return res.status(200).json({
            ok: true,
            data: tarea
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}




export const tareaController = {
    register,
    findOneById,
    findAll,
    update,
    inactivate
}