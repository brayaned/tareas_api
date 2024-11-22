import 'dotenv/config'
import express from 'express'
import tareaRouter from './routes/tarea.route.js'
import estadoTableroRouter from './routes/estado_tablero.route.js'
import tareaUsuarioRouter from './routes/tarea_usuario.route.js'
import  usuarioRouter from './routes/usuario.route.js'

const app = express();
app.use(express.json())

app.use('/api/v1/tareas', tareaRouter)
app.use('/api/v1/estado-tablero', estadoTableroRouter)
app.use('/api/v1/tarea-usuario', tareaUsuarioRouter)
app.use('/api/v1/usuario', usuarioRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server Running:' + PORT))