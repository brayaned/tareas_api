import {db} from '../database/connection.database.js'

const create = async({titulo, descripcion, comentarios, estado, estado_tablero}) => {
    const query = {
        text: `
        INSERT INTO tarea (titulo, descripcion, comentarios, estado, estado_tablero)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        values: [titulo, descripcion, comentarios, estado, estado_tablero]
    }
    const {rows} = await db.query(query)
    return rows
}

const findOneById = async(id) => {
    const query = {
        text: `
        SELECT * FROM tarea 
        WHERE id = $1
        `,
        values: [id]
    }

    const {rows} = await db.query(query)
    console.log(rows)
    return rows[0]
}


const findAll = async() => {
    const query = {
        text: `
        SELECT * FROM tarea
        `,
        
    }

    const {rows} = await db.query(query)
    return rows
}

const update = async({id, titulo, descripcion, comentarios, estado, estado_tablero}) => {
    const query = {
        text: `
        UPDATE tarea SET
        titulo = $1, descripcion = $2, comentarios = $3, estado = $4, estado_tablero = $5 
        WHERE id = $6 
        RETURNING *
        `,
        values: [titulo, descripcion, comentarios, estado, estado_tablero, id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

const inactivate = async(id) => {
    const query = {
        text: `
        UPDATE tarea SET
        estado = false
        WHERE ID = $1
        `,
        values: [id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

export const tareaModel = {
    create,
    findOneById,
    findAll,
    update,
    inactivate
}