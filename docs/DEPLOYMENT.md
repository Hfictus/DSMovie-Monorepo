## Guia de Deploy em Nuvem

## Para AWS, Azure, Heroku, DigitalOcean, etc.

### Variáveis de Ambiente Obrigatórias

Ao fazer deploy na plataforma de nuvem, definir:

APP_PROFILE=prod

DB_URL=<url-do-banco-da-nuvem>

DB_USERNAME=<usuario-banco>

DB_PASSWORD=<senha-banco>

PGADMIN_PASSWORD=<senha-pgadmin>

PORT=8080

SPRING_PROFILES_ACTIVE=prod

### Recomendações de Segurança

1. Usar um gerenciador de secrets da plataforma (AWS Secrets Manager, Azure Key Vault, etc)
2. Nunca exportar .env para a nuvem
3. Configurar HTTPS/SSL
4. Usar um firewall e whitelist de IPs
5. Fazer backup regularmente do banco de dados
