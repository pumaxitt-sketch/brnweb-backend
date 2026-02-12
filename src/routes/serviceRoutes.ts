import { Router } from 'express';
import { getServices } from '../controllers/serviceController';

const router = Router();

// GET /api/services - Listar todos os serviços
router.get('/', getServices);

export default router;
