import { Router } from 'express';
import { createContact, getContacts, markAsRead } from '../controllers/contactController';
import { contactLimiter } from '../middlewares/rateLimit';

const router = Router();

// POST /api/contact - Enviar mensagem de contato
router.post('/', contactLimiter, createContact);

// GET /api/contact - Listar todas as mensagens (admin)
router.get('/', getContacts);

// PATCH /api/contact/:id/read - Marcar como lida
router.patch('/:id/read', markAsRead);

export default router;
