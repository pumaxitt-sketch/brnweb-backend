import { Resend } from 'resend';
import { env } from '../config/env';

const resend = new Resend(env.resendApiKey);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: ContactEmailData) => {
  try {
    const { name, email, subject, message } = data;

    const response = await resend.emails.send({
      from: env.emailFrom,
      to: env.emailTo,
      subject: `[BRN.web] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5CF6;">Nova mensagem do portfólio</h2>
          <hr style="border: 1px solid #E5E7EB;" />
          
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          
          <h3 style="color: #374151;">Mensagem:</h3>
          <div style="background: #F3F4F6; padding: 16px; border-radius: 8px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="border: 1px solid #E5E7EB; margin-top: 24px;" />
          <p style="color: #6B7280; font-size: 12px;">
            Enviado através do formulário de contato do portfólio BRN.web
          </p>
        </div>
      `,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error };
  }
};
