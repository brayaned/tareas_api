import { usuarioModel } from "../models/usuario.model.js";
import bcryptjs from 'bcryptjs'
import { autenticacionService } from "../middlewares/autenticacion.middleware.js";

const register = async(req, res) => {
    try{
        const { nombre, apellido, correo, contrasena, estado} = req.body

        const usuario = await usuarioModel.findOneByEmail(correo)
        if (usuario){
            return res.status(409).json({ ok : false, msg:"El correo ya se encuentra registrado"})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedContrasena = await bcryptjs.hash(contrasena, salt)

        const newUsuario = await usuarioModel.create({ nombre, apellido, correo, contrasena: hashedContrasena, estado})
        const token = await autenticacionService.generarToken(newUsuario)

        return res.status(201).json({
            ok: true,
            data: newUsuario,
            token: token
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const login = async(req, res) => {
    try{
        const { correo, contrasena} = req.body
        const usuario = await usuarioModel.findOneByEmail(correo)
        if (!usuario){
            return res.status(404).json({ error: "No se encuentra registrado este usuario"})
        }

        const esValido = await bcryptjs.compare(contrasena, usuario.contraseña)
        if(!esValido){
            return res.status(401).json({ error: "Credenciales incorrectas"})
        }

        const token = await autenticacionService.generarToken(usuario)

        return res.status(200).json({
            ok: true,
            token: token
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
        const usuario = await usuarioModel.findOneById(id)

        return res.status(200).json({
            ok: true,
            data: usuario
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
        const usuarios = await usuarioModel.findAll()

        return res.status(200).json({
            ok: true,
            data: usuarios
        })
    }catch (error){
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

const update = async(req, res) => {
    try{
        const {id, nombre, apellido, correo, contrasena, estado} = req.body
        const usuario = await usuarioModel.update({id, nombre, apellido, correo, contrasena, estado})

        return res.status(200).json({
            ok: true,
            data: usuario
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
        const usuario = await usuarioModel.inactivate(id)
        return res.status(200).json({
            ok: true,
            data: usuario
        })

    }catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        })
    }
}

export const usuarioController = {
    register,
    findOneById,
    findAll,
    update,
    inactivate,
    login
}