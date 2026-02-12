import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';

const projectSchema = z.object({
  title: z.string().min(2, 'Título deve ter pelo menos 2 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  imageUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  technologies: z.string(), // JSON string de tecnologias
  featured: z.boolean().optional(),
  order: z.number().optional(),
});

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { featured } = req.query;

    const projects = await prisma.project.findMany({
      where: featured === 'true' ? { featured: true } : undefined,
      orderBy: { order: 'asc' },
    });

    return res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado',
      });
    }

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const data = projectSchema.parse(req.body);

    const project = await prisma.project.create({
      data,
    });

    return res.status(201).json({
      success: true,
      message: 'Projeto criado com sucesso',
      data: project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.errors,
      });
    }

    console.error('Erro ao criar projeto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = projectSchema.partial().parse(req.body);

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return res.json({
      success: true,
      message: 'Projeto atualizado com sucesso',
      data: project,
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id },
    });

    return res.json({
      success: true,
      message: 'Projeto excluído com sucesso',
    });
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};
