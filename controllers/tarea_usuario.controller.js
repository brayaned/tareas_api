import { tareaUsuarioModel } from "../models/tarea_usuario.model.js";

const register = async(req, res) => {
    try{
        const {usuario_id, tarea_id, estado} = req.body
        const tareaUsuario = await tareaUsuarioModel.create({usuario_id, tarea_id, estado})

        return res.status(201).json({
            ok: true,
            data: tareaUsuario
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
        const tareaUsuario = await tareaUsuarioModel.findOneById(id)

        return res.status(200).json({
            ok: true,
            data: tareaUsuario
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
        const tareasUsuario = await tareaUsuarioModel.findAll()

        return res.status(200).json({
            ok: true,
            data: tareasUsuario
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
        const {id,usuario_id, tarea_id, estado} = req.body
        const tareaUsuario = await tareaUsuarioModel.update({id, usuario_id, tarea_id, estado})

        return res.status(200).json({
            ok: true,
            data: tareaUsuario
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
        const tareaUsuario = await tareaUsuarioModel.inactivate(id)
        return res.status(200).json({
            ok: true,
            data: tareaUsuario
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}




export const tareaUsuarioController = {
    register,
    findOneById,
    findAll,
    update,
    inactivate
}