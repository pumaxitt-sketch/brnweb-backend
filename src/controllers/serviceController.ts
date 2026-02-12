import { Request, Response } from 'express';
import { prisma } from '../config/database';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });

    return res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};
