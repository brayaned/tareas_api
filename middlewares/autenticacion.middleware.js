import jwt from 'jsonwebtoken'


export const verificarToken = (req, res, next) => {

    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({ error: "Token no enviado"})
    }
    token = token.split(" ")[1]

    try{
        const  { correo } = jwt.verify(token, process.env.JWT_SECRET)
        next()
    }catch (error){
        console.log(error)
        return res.status(400).json({ error: "Token invalido"})
     }
 
}

const generarToken = async (usuario) => {
    console.log(usuario)
    const token = jwt.sign({
        correo: usuario.correo
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    })
    return token
}


export const autenticacionService = {
    generarToken
}