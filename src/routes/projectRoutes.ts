import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';

const router = Router();

// GET /api/projects - Listar todos os projetos
router.get('/', getProjects);

// GET /api/projects/:id - Buscar projeto por ID
router.get('/:id', getProjectById);

// POST /api/projects - Criar novo projeto (admin)
router.post('/', createProject);

// PUT /api/projects/:id - Atualizar projeto (admin)
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Excluir projeto (admin)
router.delete('/:id', deleteProject);

export default router;
