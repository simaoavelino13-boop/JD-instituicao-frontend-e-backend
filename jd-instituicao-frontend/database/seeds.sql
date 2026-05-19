-- =============================================================================
-- JD TECNOLOGIA & SERVIÇO - DADOS INICIAIS (SEEDS)
-- =============================================================================
-- Versão: 1.0.0
-- Descrição: Dados iniciais para o sistema funcionar após a criação do schema.
--            Inclui utilizador admin, serviços, categorias, equipa e
--            configurações base do site.
-- EXECUÇÃO: psql -d jd_tecnologia -f seeds.sql
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. UTILIZADORES DO SISTEMA
-- ─────────────────────────────────────────────────────────────────────────────
-- Admin padrão — Senha: JD@Admin2024
-- Utilizador teste — Senha: Teste@2024
-- IMPORTANTE: Alterar as senhas após o primeiro login!

-- Administrador
INSERT INTO users (name, email, password, phone, role, status, email_verified)
VALUES (
    'Administrador JD',
    'admin@jdtecnologia.ao',
    crypt('JD@Admin2024', gen_salt('bf', 12)),
    '+244 929 431 541',
    'admin',
    'active',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- Utilizador de teste
INSERT INTO users (name, email, password, phone, role, status, email_verified)
VALUES (
    'Utilizador Teste',
    'usuario@teste.ao',
    crypt('Teste@2024', gen_salt('bf', 12)),
    '+244 900 000 000',
    'user',
    'active',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. SERVIÇOS DA EMPRESA
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO services (title, slug, description, full_description, icon, color, features, display_order) VALUES
(
    'Desenvolvimento Web',
    'desenvolvimento-web',
    'Criamos sites institucionais, e-commerces, portais e aplicações web modernas, responsivas e otimizadas para SEO.',
    'Nossos projetos web são desenvolvidos com foco em performance, segurança e experiência do usuário. Trabalhamos com metodologias ágeis para entregar soluções que atendem exatamente às necessidades do seu negócio.',
    'ri-code-box-line', '#4299e1',
    '["Responsivo", "Otimizado para SEO", "Alta performance", "Seguro"]'::jsonb,
    1
),
(
    'Aplicativos Móveis',
    'aplicativos-moveis',
    'Desenvolvemos aplicativos nativos e híbridos para iOS e Android, com interfaces intuitivas e alta performance.',
    'Criamos apps para os mais diversos segmentos: e-commerce, saúde, educação, finanças, entre outros. Utilizamos React Native e Flutter para garantir qualidade e eficiência.',
    'ri-smartphone-line', '#48bb78',
    '["iOS e Android", "UI/UX otimizado", "Push notifications", "Offline first"]'::jsonb,
    2
),
(
    'Cibersegurança',
    'ciberseguranca',
    'Proteção avançada contra ameaças cibernéticas, auditoria de segurança e conformidade com LGPD.',
    'Oferecemos soluções completas em segurança da informação: pentest, análise de vulnerabilidades, proteção contra DDoS, backup e recuperação de dados.',
    'ri-shield-check-line', '#e53e3e',
    '["Pentest", "Monitoramento 24/7", "Backup automatizado", "LGPD compliance"]'::jsonb,
    3
),
(
    'Análise de Dados',
    'analise-de-dados',
    'Transformamos dados em insights valiosos para tomada de decisão com dashboards interativos.',
    'Utilizamos ferramentas de Business Intelligence e ciência de dados para ajudar sua empresa a tomar decisões mais assertivas baseadas em dados reais.',
    'ri-bar-chart-2-line', '#ed8936',
    '["Dashboards customizados", "ETL", "Machine Learning", "Relatórios automáticos"]'::jsonb,
    4
),
(
    'Consultoria em TI',
    'consultoria-em-ti',
    'Ajudamos sua empresa a definir a melhor estratégia tecnológica para alcançar seus objetivos.',
    'Nossa equipe de consultores experientes avalia sua infraestrutura, processos e necessidades para propor soluções alinhadas ao seu negócio.',
    'ri-group-line', '#9f7aea',
    '["Análise de infraestrutura", "Planejamento estratégico", "Gestão de projetos", "Treinamento"]'::jsonb,
    5
),
(
    'Design UX/UI',
    'design-ux-ui',
    'Criamos experiências digitais memoráveis com interfaces bonitas, intuitivas e centradas no usuário.',
    'Nossos designers criam protótipos interativos, realizam testes de usabilidade e garantem que seu produto digital ofereça a melhor experiência possível.',
    'ri-palette-line', '#f6ad55',
    '["Pesquisa com usuários", "Wireframes", "Protótipos", "Testes de usabilidade"]'::jsonb,
    6
)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. CATEGORIAS DO BLOG
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO blog_categories (name, slug, description, color) VALUES
    ('Transformação Digital', 'transformacao-digital', 'Artigos sobre transformação digital e inovação', '#4299e1'),
    ('Segurança', 'seguranca', 'Cibersegurança e proteção de dados', '#e53e3e'),
    ('Desenvolvimento', 'desenvolvimento', 'Desenvolvimento web e mobile', '#48bb78'),
    ('Design', 'design', 'UX/UI e design de interfaces', '#f6ad55'),
    ('Cloud', 'cloud', 'Cloud computing e infraestrutura', '#9f7aea'),
    ('Gestão de TI', 'gestao-de-ti', 'Gestão e consultoria em tecnologia', '#ed8936')
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. MEMBROS DA EQUIPA
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO team_members (name, position, bio, linkedin_url, email, display_order) VALUES
(
    'J.D',
    'CEO & Fundador',
    'Especialista em transformação digital com mais de 15 anos de experiência no mercado angolano.',
    'https://linkedin.com/in/joaosilva',
    'joao@jdtecnologia.ao',
    1
),
(
    'Maria Santos',
    'Diretora de Tecnologia',
    'Arquiteta de soluções cloud e especialista em cibersegurança.',
    'https://linkedin.com/in/mariasantos',
    'maria@jdtecnologia.ao',
    2
),
(
    'Helmer Capasola',
    'Lead Developer',
    'Desenvolvedor full-stack especializado em React, Node.js e arquitetura de microsserviços.',
    'https://linkedin.com/in/carlosmendes',
    'carlos@jdtecnologia.ao',
    3
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. GALERIA INICIAL
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO gallery (title, description, category, image_url, thumbnail_url, photographer, tags, display_order) VALUES
(
    'JD Tecnologias & Serviços - Logo Oficial',
    'Logotipo oficial da JD Tecnologias & Serviços, representando nossa identidade visual e compromisso com a excelência em tecnologia e serviços em Angola.',
    'identidade',
    '/images/logo-jd.jpeg',
    '/images/logo-jd.jpeg',
    'JD Tecnologias',
    '["logo", "identidade", "marca", "oficial"]'::jsonb,
    1
),
(
    'JD Tecnologias - Versão Alternativa',
    'Variação do logotipo da JD Tecnologias, destacando a parceria entre tecnologia e serviços de qualidade para o mercado angolano.',
    'identidade',
    '/images/logo-jd-alternativo.png',
    '/images/logo-jd-alternativo.png',
    'JD Tecnologias',
    '["logo", "identidade", "tecnologia", "servicos"]'::jsonb,
    2
),
(
    'Formação e Suporte Técnico de Excelência',
    'Programa de formação e suporte técnico da JD Tecnologias.',
    'eventos',
    '/images/formacao-suporte.png',
    '/images/formacao-suporte.png',
    'JD Tecnologias',
    '["formação", "suporte", "treinamento", "excelência"]'::jsonb,
    3
),
(
    'Liderança e Princípios de Serviço',
    'Princípios fundamentais de liderança e excelência no atendimento.',
    'valores',
    '/images/lideranca-servico.png',
    '/images/lideranca-servico.png',
    'JD Tecnologias',
    '["liderança", "valores", "princípios", "serviço"]'::jsonb,
    4
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. CONFIGURAÇÕES DO SITE
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO site_settings (key, value, type, description) VALUES
    ('site_name', 'JD Tecnologia & Serviço', 'string', 'Nome do site'),
    ('site_description', 'Soluções inovadoras em Tecnologia da Informação para empresas em Angola', 'string', 'Descrição do site'),
    ('contact_email', 'jd.hrtecnogias@gmail.com', 'string', 'E-mail principal de contato'),
    ('contact_phone', '+244 929 431 541', 'string', 'Telefone principal'),
    ('contact_whatsapp', '+244929431541', 'string', 'WhatsApp para contato'),
    ('contact_address', 'Rua da Tecnologia, 123 - Edifício Tech Center, 5º Andar', 'string', 'Endereço'),
    ('contact_city', 'Luanda', 'string', 'Cidade'),
    ('contact_neighborhood', 'Zamba 2', 'string', 'Bairro'),
    ('social_instagram', 'https://instagram.com/jdtecnologia', 'string', 'URL Instagram'),
    ('social_linkedin', 'https://linkedin.com/company/jdtecnologia', 'string', 'URL LinkedIn'),
    ('social_facebook', 'https://facebook.com/jdtecnologia', 'string', 'URL Facebook'),
    ('working_hours_weekday', 'Segunda a Sexta: 09h às 17h', 'string', 'Horário de funcionamento (dias úteis)'),
    ('working_hours_saturday', 'Sábado: 8h às 12h', 'string', 'Horário de funcionamento (sábado)'),
    ('working_hours_sunday', 'Domingo: Fechado', 'string', 'Horário de funcionamento (domingo)'),
    ('maintenance_mode', 'false', 'boolean', 'Modo de manutenção ativado'),
    ('max_upload_size', '10485760', 'number', 'Tamanho máximo de upload em bytes (10MB)')
ON CONFLICT (key) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. VAGAS DE EMPREGO INICIAIS
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO jobs (title, slug, description, requirements, benefits, job_type, location_type, location) VALUES
(
    'Desenvolvedor Full Stack Pleno',
    'desenvolvedor-full-stack-pleno',
    'Desenvolvimento de aplicações web completas, integrando front-end e back-end com tecnologias modernas.',
    '["React.js ou Vue.js", "Node.js ou PHP/Laravel", "Banco de dados SQL", "API RESTful", "Git"]'::jsonb,
    '["Salário competitivo", "Vale alimentação", "Horário flexível", "Home office parcial"]'::jsonb,
    'CLT', 'Híbrido', 'Luanda (Híbrido)'
),
(
    'Especialista em Cibersegurança',
    'especialista-em-ciberseguranca',
    'Implementação e manutenção de políticas de segurança, análise de vulnerabilidades e resposta a incidentes.',
    '["Firewalls e IDS/IPS", "Pentest", "Certificações na área (diferencial)", "Inglês avançado"]'::jsonb,
    '["Salário compatível", "Bônus por desempenho", "Treinamentos certificados"]'::jsonb,
    'CLT', 'Presencial', 'Luanda (Presencial)'
),
(
    'UX/UI Designer',
    'ux-ui-designer',
    'Criação de interfaces e experiências digitais centradas no usuário para web e mobile.',
    '["Portfólio de projetos", "Figma ou Adobe XD", "Design system", "Pesquisa com usuários"]'::jsonb,
    '["Salário competitivo", "Equipamento fornecido", "Ambiente criativo", "Horário flexível"]'::jsonb,
    'PJ', 'Remoto', 'Remoto'
)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. PROJETOS DO PORTFÓLIO
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO portfolio_projects (title, slug, description, full_description, client_name, project_date, technologies, images, is_featured) VALUES
(
    'E-commerce TechStore',
    'e-commerce-techstore',
    'Plataforma de e-commerce completa para loja de tecnologia angolana.',
    'Desenvolvemos uma plataforma de e-commerce robusta e escalável para a TechStore.',
    'TechStore Angola', '2023-12',
    '["React", "Node.js", "MongoDB"]'::jsonb,
    '["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop"]'::jsonb,
    TRUE
),
(
    'App Bancário Mobile',
    'app-bancario-mobile',
    'Aplicativo mobile para banco digital com funcionalidades completas.',
    'Desenvolvemos um aplicativo bancário completo com login biométrico.',
    'Banco Digital Angola', '2023-10',
    '["React Native", "Node.js", "PostgreSQL"]'::jsonb,
    '["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop"]'::jsonb,
    TRUE
),
(
    'Portal Educacional',
    'portal-educacional',
    'Plataforma de gestão escolar e ambiente virtual de aprendizagem.',
    'Sistema completo para escolas com gestão de alunos.',
    'Escola Moderna', '2023-08',
    '["Laravel", "Vue.js", "MySQL"]'::jsonb,
    '["https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop"]'::jsonb,
    FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- FIM DOS SEEDS
-- =============================================================================
