# Base de Dados — JD Tecnologia & Serviço

## Visão Geral

Base de dados PostgreSQL 15+ para o sistema institucional da **JD Tecnologia**, cobrindo todas as funcionalidades do frontend e da API backend.

## Estrutura

```
database/
├── schema.sql    → Schema completo (tabelas, índices, triggers, views)
├── seeds.sql     → Dados iniciais (admin, serviços, equipa, etc.)
├── setup.sh      → Script de automação (create/reset/backup)
└── README.md     → Este ficheiro
```

## Requisitos

- **PostgreSQL** 15 ou superior
- Extensões: `uuid-ossp`, `pgcrypto`, `unaccent` (instaladas automaticamente pelo schema)

## Setup Rápido

```bash
# Dar permissão de execução ao script
chmod +x database/setup.sh

# Criar base de dados + schema + seeds
./database/setup.sh create

# Apenas schema (sem dados)
./database/setup.sh schema

# Apenas seeds
./database/setup.sh seeds
```

## Variáveis de Ambiente

| Variável  | Padrão      | Descrição            |
|-----------|-------------|----------------------|
| `DB_NAME` | jd_tecnologia | Nome da base de dados |
| `DB_USER` | postgres    | Utilizador PostgreSQL |
| `DB_HOST` | localhost   | Host do servidor      |
| `DB_PORT` | 5432        | Porta do servidor     |

## Tabelas (18 tabelas)

| Tabela | Descrição |
|--------|-----------|
| `users` | Utilizadores e autenticação |
| `password_resets` | Tokens de recuperação de senha |
| `sessions` | Sessões ativas |
| `site_content` | Conteúdo editável das páginas (CMS) |
| `team_members` | Membros da equipa |
| `services` | Serviços oferecidos |
| `blog_categories` | Categorias do blog |
| `blog_posts` | Artigos do blog |
| `contacts` | Mensagens de contato |
| `portfolio_projects` | Projetos do portfólio |
| `testimonials` | Depoimentos de clientes |
| `jobs` | Vagas de emprego |
| `job_applications` | Candidaturas a vagas |
| `media` | Ficheiros carregados |
| `gallery` | Galeria de imagens |
| `newsletter_subscribers` | Inscritos na newsletter |
| `activity_logs` | Registos de auditoria |
| `site_settings` | Configurações do site |

## Credenciais Padrão (Desenvolvimento)

- **E-mail:** `admin@jdtecnologia.ao`
- **Senha:** `JD@Admin2024`

> ⚠️ **Alterar imediatamente em produção!**

## Backup e Restauro

```bash
# Criar backup
./database/setup.sh backup

# Restaurar
./database/setup.sh restore
```

## Mapeamento API → Tabelas

| Endpoint API | Tabela |
|---|---|
| `/api/auth/*` | `users`, `sessions`, `password_resets` |
| `/api/content/:page/:section` | `site_content` |
| `/api/contact` | `contacts` |
| `/api/blog/*` | `blog_posts`, `blog_categories` |
| `/api/jobs/*` | `jobs`, `job_applications` |
| `/api/portfolio/*` | `portfolio_projects` |
| `/api/testimonials` | `testimonials` |
| `/api/services/*` | `services` |
| `/api/team/*` | `team_members` |
| `/api/media/*` | `media` |
| `/api/admin/*` | `activity_logs`, `site_settings` |
