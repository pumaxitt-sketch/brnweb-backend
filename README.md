# 🚀 BRN.web Backend API

Backend API para o portfólio BRN.web desenvolvido com Node.js, Express, TypeScript e Prisma.

## 📚 Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Email:** Resend
- **Validação:** Zod

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
copy .env.example .env

# Gerar cliente Prisma
npm run prisma:generate

# Rodar migrações
npm run prisma:migrate

# Iniciar em desenvolvimento
npm run dev
```

## 🛣️ Endpoints

### Health Check
- `GET /api/health` - Verificar status da API

### Contato
- `POST /api/contact` - Enviar mensagem de contato
- `GET /api/contact` - Listar mensagens (admin)
- `PATCH /api/contact/:id/read` - Marcar como lida

### Projetos
- `GET /api/projects` - Listar projetos
- `GET /api/projects?featured=true` - Listar projetos em destaque
- `GET /api/projects/:id` - Buscar projeto por ID
- `POST /api/projects` - Criar projeto (admin)
- `PUT /api/projects/:id` - Atualizar projeto (admin)
- `DELETE /api/projects/:id` - Excluir projeto (admin)

### Serviços
- `GET /api/services` - Listar serviços

## 📁 Estrutura

```
src/
├── config/          # Configurações (env, database, cors)
├── controllers/     # Lógica dos endpoints
├── middlewares/     # Middlewares (validação, rate limit)
├── routes/          # Definição de rotas
├── services/        # Serviços externos (email)
└── app.ts           # Entrada da aplicação
```

## 🔐 Variáveis de Ambiente

| Variável | Descrição |
|----------|----------|
| `PORT` | Porta do servidor |
| `DATABASE_URL` | URL de conexão PostgreSQL |
| `RESEND_API_KEY` | Chave da API Resend |
| `EMAIL_FROM` | Email de origem |
| `EMAIL_TO` | Email de destino |
| `FRONTEND_URL` | URL do frontend (CORS) |

## 🚀 Deploy

Recomendado: **Railway** ou **Render**

```bash
# Build
npm run build

# Start
npm start
```

## 👨‍💻 Autor

**Vinicius Brina** - [BRN.web](https://portfolio-brnweb.vercel.app)

- Email: brn.webs@gmail.com
- Telefone: +55 48 99930-4456
- Localização: Criciúma, Brasil
