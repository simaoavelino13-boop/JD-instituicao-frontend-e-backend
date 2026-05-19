#!/bin/bash
# =============================================================================
# JD TECNOLOGIA - Script de Setup do Banco de Dados
# =============================================================================
# Uso: ./setup.sh [opção]
# Opções:
#   create    - Cria a base de dados e aplica o schema + seeds
#   reset     - Apaga e recria a base de dados (CUIDADO em produção!)
#   schema    - Aplica apenas o schema (sem seeds)
#   seeds     - Aplica apenas os seeds
#   backup    - Cria backup da base de dados
#   restore   - Restaura a base de dados a partir de backup
# =============================================================================

set -e

# ─── Configurações ───────────────────────────────────────────────────────────
DB_NAME="${DB_NAME:-jd_tecnologia}"
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
BACKUP_DIR="./backups"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ─── Cores para output ──────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ─── Funções auxiliares ──────────────────────────────────────────────────────
info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warning() { echo -e "${YELLOW}[AVISO]${NC} $1"; }
error()   { echo -e "${RED}[ERRO]${NC} $1"; exit 1; }

check_postgres() {
    if ! command -v psql &> /dev/null; then
        error "PostgreSQL (psql) não encontrado. Instale com: sudo apt install postgresql-client"
    fi
    info "PostgreSQL encontrado: $(psql --version)"
}

db_exists() {
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"
}

# ─── Comando: create ────────────────────────────────────────────────────────
cmd_create() {
    check_postgres
    info "Criando base de dados '$DB_NAME'..."

    if db_exists; then
        warning "Base de dados '$DB_NAME' já existe."
        read -p "Deseja continuar e aplicar schema/seeds? (s/N): " confirm
        if [[ "$confirm" != "s" && "$confirm" != "S" ]]; then
            info "Operação cancelada."
            exit 0
        fi
    else
        createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
        success "Base de dados '$DB_NAME' criada."
    fi

    cmd_schema
    cmd_seeds
    success "Setup completo! Base de dados '$DB_NAME' pronta para uso."
}

# ─── Comando: reset ─────────────────────────────────────────────────────────
cmd_reset() {
    check_postgres
    warning "ATENÇÃO: Isso vai APAGAR toda a base de dados '$DB_NAME'!"
    read -p "Tem certeza? Digite o nome da base para confirmar: " confirm

    if [[ "$confirm" != "$DB_NAME" ]]; then
        error "Nome incorreto. Operação cancelada."
    fi

    # Fazer backup antes de apagar
    if db_exists; then
        info "Criando backup de segurança..."
        cmd_backup
    fi

    info "Apagando base de dados '$DB_NAME'..."
    dropdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" --if-exists "$DB_NAME"
    success "Base de dados apagada."

    cmd_create
}

# ─── Comando: schema ────────────────────────────────────────────────────────
cmd_schema() {
    check_postgres
    info "Aplicando schema..."
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$SCRIPT_DIR/schema.sql"
    success "Schema aplicado com sucesso."
}

# ─── Comando: seeds ─────────────────────────────────────────────────────────
cmd_seeds() {
    check_postgres
    info "Inserindo dados iniciais (seeds)..."
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$SCRIPT_DIR/seeds.sql"
    success "Seeds inseridos com sucesso."
}

# ─── Comando: backup ────────────────────────────────────────────────────────
cmd_backup() {
    check_postgres
    mkdir -p "$BACKUP_DIR"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql"

    info "Criando backup em '$BACKUP_FILE'..."
    pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"
    success "Backup criado: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"
}

# ─── Comando: restore ───────────────────────────────────────────────────────
cmd_restore() {
    check_postgres

    if [ -z "$2" ]; then
        info "Backups disponíveis:"
        ls -la "$BACKUP_DIR"/*.sql 2>/dev/null || error "Nenhum backup encontrado em $BACKUP_DIR"
        echo ""
        read -p "Ficheiro de backup: " BACKUP_FILE
    else
        BACKUP_FILE="$2"
    fi

    if [ ! -f "$BACKUP_FILE" ]; then
        error "Ficheiro '$BACKUP_FILE' não encontrado."
    fi

    warning "Isso vai substituir os dados atuais da base '$DB_NAME'!"
    read -p "Continuar? (s/N): " confirm
    if [[ "$confirm" != "s" && "$confirm" != "S" ]]; then
        info "Operação cancelada."
        exit 0
    fi

    info "Restaurando de '$BACKUP_FILE'..."
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" < "$BACKUP_FILE"
    success "Base de dados restaurada."
}

# ─── Menu principal ──────────────────────────────────────────────────────────
echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     JD TECNOLOGIA - Gestão de Base de Dados              ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

case "${1:-help}" in
    create)  cmd_create ;;
    reset)   cmd_reset ;;
    schema)  cmd_schema ;;
    seeds)   cmd_seeds ;;
    backup)  cmd_backup ;;
    restore) cmd_restore "$@" ;;
    *)
        echo "Uso: $0 {create|reset|schema|seeds|backup|restore}"
        echo ""
        echo "Comandos:"
        echo "  create   Cria a base de dados e aplica schema + seeds"
        echo "  reset    Apaga e recria a base de dados (faz backup antes)"
        echo "  schema   Aplica apenas o schema SQL"
        echo "  seeds    Aplica apenas os dados iniciais"
        echo "  backup   Cria backup da base de dados"
        echo "  restore  Restaura a partir de um backup"
        echo ""
        echo "Variáveis de ambiente:"
        echo "  DB_NAME=$DB_NAME  DB_USER=$DB_USER  DB_HOST=$DB_HOST  DB_PORT=$DB_PORT"
        ;;
esac
