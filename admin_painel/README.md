# Painel Admin — Prof. Gabriel Moraes

Painel para cadastro de alunos e os cursos que eles compraram/concluíram.
Apenas login (sem cadastro), com dashboard.

- **Frontend:** React + Vite + Tailwind
- **Backend:** Node + Express + TypeORM (TypeScript)
- **Banco de dados:** MySQL

## Pré-requisitos

- Node.js 20+
- MySQL 8 rodando

## Configuração do banco

Crie apenas o **banco de dados** (as tabelas são criadas automaticamente pelo
TypeORM na primeira execução, via `synchronize: true`):

```sql
CREATE DATABASE admin_painel;
```

Depois, configure a conexão em `server/.env`:

```
DB_HOST = localhost
DB_USER = root
DB_PASS = sua_senha
DB_PORT = 3306
DB_NAME = admin_painel

JWT_SECRET = troque_este_segredo_em_producao
```

> O `.env` contém senhas e **não** é versionado no Git.

Na primeira vez que o backend sobe, ele cria automaticamente:
- As tabelas `user`, `student` e `course`
- Um usuário admin padrão (**usuario: `admin` / senha: `admin123`**), caso ainda
  não exista nenhum usuário — veja `server/src/config/seed.ts`.

## Como rodar

Precisa de **2 terminais**:

```bash
# Terminal 1 — backend (API + MySQL)
cd server
npm install
npm start            # http://localhost:3001  (ou: npm run dev, com auto-reload)

# Terminal 2 — frontend
npm install
npm run dev          # http://localhost:5173
```

Acesse **http://localhost:5173** e entre com:

- Usuário: `admin`
- Senha: `admin123`

## API

Base: `http://localhost:3001/api`

- `POST /login` — autenticação, retorna o token JWT
- Demais rotas exigem o header `Authorization: Bearer <token>`:
  - `GET /stats` — números do dashboard
  - `GET|POST /alunos`, `GET|PUT|DELETE /alunos/:id` — CRUD de alunos
  - `POST /alunos/:id/cursos`, `PUT|DELETE /alunos/:studentId/cursos/:courseId` — cursos do aluno

## Estrutura

```
admin_painel/
├── src/                       # Frontend React
│   ├── pages/                 # Login, Dashboard, Alunos, Detalhe do aluno
│   ├── components/            # Layout, formulários, modal
│   └── lib/                   # api.js (chamadas HTTP), auth.js, format.js
└── server/                    # Backend Express + TypeORM + MySQL
    └── src/
        ├── server.ts          # Ponto de entrada (inicializa o banco e sobe a API)
        ├── config/            # data-source.ts (conexão TypeORM), seed.ts (admin padrão)
        ├── models/            # Entidades User, Student, Course
        ├── routes/            # Rotas da API
        ├── controllers/       # Controllers
        ├── services/          # Regras de negócio
        ├── middlewares/       # Autenticação (JWT) e validação
        └── validators/        # Schemas Zod
```
