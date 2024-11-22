import { estadoTableroModel } from "../models/estado_tablero.model.js";

const register = async(req, res) => {
    try{
        const {nombre, descripcion, estado} = req.body
        const estadoTablero = await estadoTableroModel.create({nombre, descripcion, estado})

        return res.status(201).json({
            ok: true,
            data: estadoTablero
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
        const estadoTablero = await estadoTableroModel.findOneById(id)

        return res.status(200).json({
            ok: true,
            data: estadoTablero
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
        const estadosTablero = await estadoTableroModel.findAll()

        return res.status(200).json({
            ok: true,
            data: estadosTablero
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
        const {id,nombre, descripcion, estado} = req.body
        const tarea = await estadoTableroModel.update({id,nombre, descripcion, estado})

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
        const estadoTablero = await estadoTableroModel.inactivate(id)
        return res.status(200).json({
            ok: true,
            data: estadoTablero
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}




export const estadoTableroController = {
    register,
    findOneById,
    findAll,
    update,
    inactivate
}