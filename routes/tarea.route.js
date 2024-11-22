import {Router} from "express";
import { tareaController } from "../controllers/tarea.controller.js";

const router = Router()

router.post('/', tareaController.register)
router.get('/:id', tareaController.findOneById)
router.get('/', tareaController.findAll)
router.put('/', tareaController.update)
router.get('/delete/:id', tareaController.inactivate)


export default router;