import {db} from '../database/connection.database.js'

const create = async({ nombre, apellido, correo, contrasena, estado}) => {
    const query = {
        text: `
        INSERT INTO usuario (nombre, apellido, correo, contraseña, estado)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING nombre, apellido, correo, estado
        `,
        values: [nombre, apellido, correo, contrasena, estado]
    }
    const {rows} = await db.query(query)
    return rows[0]
}

const findOneById = async(id) => {
    const query = {
        text: `
        SELECT * FROM usuario 
        WHERE id = $1
        `,
        values: [id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}



const findOneByEmail = async (correo) => {
    const query = {
        text: `
        SELECT * FROM usuario 
        WHERE correo = $1
        `,
        values: [correo]
    }

    const {rows} = await db.query(query)
    console.log(rows)
    return rows[0]
}

const findAll = async() => {
    const query = {
        text: `
        SELECT * FROM usuario
        `,
    }

    const {rows} = await db.query(query)
    return rows
}

const update = async({id, nombre, apellido, correo, contrasena, estado}) => {
    const query = {
        text: `
        UPDATE usuario SET
        nombre = $1, apellido = $2, correo = $3, contraseña = $4, estado = $5 
        WHERE id = $6 
        RETURNING *
        `,
        values: [nombre, apellido, correo, contrasena, estado, id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

const inactivate = async(id) => {
    const query = {
        text: `
        UPDATE usuario SET
        estado = false
        WHERE ID = $1
        `,
        values: [id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

export const usuarioModel = {
    create,
    findOneById,
    findAll,
    update,
    inactivate,
    findOneByEmail
}