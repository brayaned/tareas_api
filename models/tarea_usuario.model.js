import {db} from '../database/connection.database.js'

const create = async({usuario_id, tarea_id, estado}) => {
    const query = {
        text: `
        INSERT INTO tarea_usuario (usuario_id, tarea_id, estado)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        values: [usuario_id, tarea_id, estado]
    }
    const {rows} = await db.query(query)
    return rows
}

const findOneById = async(id) => {
    const query = {
        text: `
        SELECT * FROM tarea_usuario 
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
        SELECT * FROM tarea_usuario
        `,
    }

    const {rows} = await db.query(query)
    return rows
}

const update = async({id, usuario_id, tarea_id, estado}) => {
    const query = {
        text: `
        UPDATE tarea_usuario SET
        usuario_id = $1, tarea_id = $2, estado = $3
        WHERE id = $4 
        RETURNING *
        `,
        values: [usuario_id, tarea_id, estado, id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

const inactivate = async(id) => {
    const query = {
        text: `
        UPDATE tarea_usuario SET
        estado = false
        WHERE ID = $1
        `,
        values: [id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

export const tareaUsuarioModel = {
    create,
    findOneById,
    findAll,
    update,
    inactivate
}