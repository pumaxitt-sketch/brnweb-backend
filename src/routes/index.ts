import { Router } from 'express';
import contactRoutes from './contactRoutes';
import projectRoutes from './projectRoutes';
import serviceRoutes from './serviceRoutes';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API BRN.web está funcionando!',
    timestamp: new Date().toISOString(),
  });
});

export default router;
