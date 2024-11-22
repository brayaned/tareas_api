import {db} from '../database/connection.database.js'

const create = async({nombre, descripcion, estado}) => {
    const query = {
        text: `
        INSERT INTO estado_tablero (nombre, descripcion, estado)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        values: [nombre, descripcion, estado]
    }
    const {rows} = await db.query(query)
    return rows
}

const findOneById = async(id) => {
    const query = {
        text: `
        SELECT * FROM estado_tablero 
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
        SELECT * FROM estado_tablero
        `,
        
    }

    const {rows} = await db.query(query)
    return rows
}

const update = async({id, nombre, descripcion, estado}) => {
    const query = {
        text: `
        UPDATE estado_tablero SET
        nombre = $1, descripcion = $2, estado = $3
        WHERE id = $4 
        RETURNING *
        `,
        values: [nombre, descripcion, estado, id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

const inactivate = async(id) => {
    const query = {
        text: `
        UPDATE estado_tablero SET
        estado = false
        WHERE ID = $1
        `,
        values: [id]
    }

    const {rows} = await db.query(query)
    return rows[0]
}

export const estadoTableroModel = {
    create,
    findOneById,
    findAll,
    update,
    inactivate
}