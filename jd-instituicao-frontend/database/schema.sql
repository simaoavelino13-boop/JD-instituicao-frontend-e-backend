-- Script de Criação do Banco de Dados PostgreSQL para a Plataforma Institucional JD Tecnologia
-- Padrão de Nível Profissional com constraints, índices e auditoria básica

-- 1. Criação de ENUMs
CREATE TYPE user_role AS ENUM ('user', 'admin', 'editor');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE message_status AS ENUM ('unread', 'read', 'replied');

-- 2. Tabela de Utilizadores (Autenticação e Perfis)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telefone VARCHAR(30),
    senha_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user',
    termos_aceites BOOLEAN NOT NULL DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    ultimo_acesso TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Categorias do Blog
CREATE TABLE blog_categories (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Artigos do Blog
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    conteudo TEXT NOT NULL,
    resumo TEXT,
    imagem_url VARCHAR(500),
    autor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    categoria_id INTEGER REFERENCES blog_categories(id) ON DELETE SET NULL,
    status post_status DEFAULT 'draft',
    tempo_leitura_min INTEGER DEFAULT 5,
    visualizacoes INTEGER DEFAULT 0,
    data_publicacao TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabela de Tags do Blog (Muitos para Muitos simplificado)
CREATE TABLE blog_tags (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE blog_post_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- 6. Tabela da Galeria
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    imagem_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    categoria VARCHAR(100) NOT NULL,
    fotografo VARCHAR(150),
    data_captura DATE,
    dimensoes VARCHAR(50),
    tamanho_bytes INTEGER,
    visualizacoes INTEGER DEFAULT 0,
    destaque BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabela de Mensagens de Contacto
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(30),
    assunto VARCHAR(200) NOT NULL,
    mensagem TEXT NOT NULL,
    status message_status DEFAULT 'unread',
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Tabela de Subscritores da Newsletter
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(150) UNIQUE NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- 9. Tabela de Candidaturas (Recrutamento)
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vaga_id VARCHAR(100) NOT NULL, -- Pode referenciar uma tabela vagas futura
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(30),
    linkedin_url VARCHAR(255),
    portfolio_url VARCHAR(255),
    curriculo_url VARCHAR(500) NOT NULL,
    mensagem TEXT,
    status VARCHAR(50) DEFAULT 'nova',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Funções e Triggers para Atualização de Updated_At
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 11. Criação de Índices para Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_categoria ON blog_posts(categoria_id);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_gallery_categoria ON gallery_images(categoria);
CREATE INDEX idx_contact_status ON contact_messages(status);

-- 12. Inserção de Dados Iniciais (Seed)
INSERT INTO users (nome, email, telefone, senha_hash, role, termos_aceites)
VALUES ('Administrador Master', 'admin@jdtecnologia.ao', '+244 900 000 000', '$2b$10$xyz...', 'admin', TRUE);

INSERT INTO blog_categories (nome, slug, descricao) VALUES
('Transformação Digital', 'transformacao-digital', 'Artigos sobre a digitalização de processos corporativos'),
('Cibersegurança', 'ciberseguranca', 'Dicas e novidades sobre proteção de dados e sistemas'),
('Inovação', 'inovacao', 'Tendências tecnológicas globais e o seu impacto em Angola');
