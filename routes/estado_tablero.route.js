import {Router} from "express";
import { estadoTableroController } from "../controllers/estado_tablero.controller.js";

const router = Router()

router.post('/', estadoTableroController.register)
router.get('/:id', estadoTableroController.findOneById)
router.get('/', estadoTableroController.findAll)
router.put('/', estadoTableroController.update)
router.get('/delete/:id', estadoTableroController.inactivate)


export default router;