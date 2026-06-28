# Painel Admin — Prof. Gabriel Moraes

Painel para cadastro de alunos e os cursos que eles compraram/concluíram.
Apenas login (sem cadastro), com dashboard.

- **Frontend:** React + Vite + Tailwind
- **Backend:** Node + Express
- **Banco de dados:** MySQL

## Pré-requisitos

- Node.js 20+
- MySQL 8 rodando

## Configuração do banco (uma vez só)

Crie o banco, as tabelas e o usuário da aplicação rodando o `schema.sql`:

```bash
mysql -u root -p < server/schema.sql
```

Isso cria:
- Banco `painel_admin` com as tabelas `alunos` e `cursos`
- Usuário `painel` (senha em `server/schema.sql`) usado pela aplicação

Depois, configure a conexão em `server/.env` (copie de `server/.env.example`):

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=painel
DB_PASSWORD="PainelAdmin#2026"
DB_NAME=painel_admin

ADMIN_USER=admin
ADMIN_PASS=admin123
ADMIN_SECRET="algo-aleatorio"
```

> O `.env` contém senhas e **não** é versionado no Git.

## Como rodar

Precisa de **2 terminais**:

```bash
# Terminal 1 — backend (API + MySQL)
cd server
npm install
npm start            # http://localhost:3001

# Terminal 2 — frontend
npm install
npm run dev          # http://localhost:5173
```

Acesse **http://localhost:5173** e entre com:

- Usuário: `admin`
- Senha: `admin123`

(Para trocar usuário/senha do painel, edite `ADMIN_USER` / `ADMIN_PASS` no `server/.env`.)

## Estrutura

```
admin_painel/
├── src/                 # Frontend React
│   ├── pages/           # Login, Dashboard, Alunos, Detalhe do aluno
│   ├── components/      # Layout, formulários, modal
│   └── lib/             # api.js (chamadas HTTP), auth.js, format.js
└── server/              # Backend Express + MySQL
    ├── index.js         # Rotas da API
    ├── db.js            # Pool de conexão MySQL
    ├── auth.js          # Login com token
    ├── schema.sql       # Criação do banco/tabelas/usuário
    └── .env             # Credenciais (não versionado)
```
