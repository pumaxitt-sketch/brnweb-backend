import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database';
import { sendContactEmail } from '../services/emailService';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export const createContact = async (req: Request, res: Response) => {
  try {
    const data = contactSchema.parse(req.body);

    // Salvar no banco de dados
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    // Enviar email de notificação
    await sendContactEmail(data);

    return res.status(201).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Retornarei em breve.',
      data: { id: contact.id },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.errors,
      });
    }

    console.error('Erro ao criar contato:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.update({
      where: { id },
      data: { read: true },
    });

    return res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Erro ao marcar como lido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
};
