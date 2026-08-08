# Passo a passo de testes locais à implantação em nuvem, no Railway.
## Perfil test:
src/main/resources/application.properties:
```
# Perfil ativo (test, dev ou prod)
spring.profiles.active=${APP_PROFILE:test}
```

Ao se executar a aplicação, se não houver erros no log do console da IDE, é possível acessar a página de confirmação do Spring Boot pela URL http://localhost:8080

<img width="100%" alt="Página de confirmação do Spring Boot" src="./docs/assets/whitelabel-error-page-test.png" />

Pode-se acessar o gerenciador do H2 através da seguinte URL no navegador:<br>
http://localhost:8080/h2-console

<img width="100%" alt="Acesso ao h2-console" src="./docs/assets/h2-login.png" />

Lembrando que os valores de JDBC URL, User Name e Password estão em src/main/resources/application-test.properties; e que o h2-console deve ser configurado nesse mesmo arquivo para se acessar o gerenciador.

Painel de gerenciamento do H2:
<img width="100%" alt="Painel de gerenciamento do H2" src="./docs/assets/h2-console.png" />

src/main/resources/import.sql - contém a estrutura e dados para testes com o banco de dados em memória.

### Testes com Postman para o perfil test:
Exemplo de formato para URL:<br>
http://localhost:8080/movies (como há busca paginada, pode-se também usar parâmetros opcionais) <br>
ou<br>
{{host}}/movies (ao se criar variáveis de ambiente)


## Perfil dev:
### Sem Docker:
Baixar banco de dados com gerenciador (usou-se PostgreSQL + PgAdmin).<br>
Importante: ao se instalar PostgreSQL, durante o passo a passo no instalador, é solicitada a criação de uma senha para o usuário padrão postgres (o superusuário). Essa senha sempre será usada para acessar os servidores criados e administrados através do PgAdmin.

Configurar perfil dev em src/main/resources/application.properties:
```
# Perfil ativo (test, dev ou prod)
spring.profiles.active=${APP_PROFILE:dev}
```
Executar a aplicação com as seguintes linhas descomentadas em src/main/resources/application-dev.properties, para gerar create.sql.
```
spring.jpa.properties.jakarta.persistence.schema-generation.create-source=metadata
spring.jpa.properties.jakarta.persistence.schema-generation.scripts.action=create
spring.jpa.properties.jakarta.persistence.schema-generation.scripts.create-target=create.sql
spring.jpa.properties.hibernate.hbm2ddl.delimiter=;
```
Comentar novamente as linhas acima após execução.<br>

Obs: sobre o banco de dados e seu gerenciador, há algumas imagens na seção Perfil prod.<br>

No PgAdmin, criar servidor local e banco de dados (apenas o nome é suficiente).<br>
Botão direito do mouse com seta sobre Servers<br>
Register<br>
Server<br>
Nomear o servidor no campo Name da aba General.<br>

Criar banco de dados:<br>
Botão direito do mouse com seta sobre Servidor criado<br>
Databases<br>
Create<br>
Database<br>
Nomear no campo database da aba General.<br>

Criar tabelas com dados para testes no banco de dados:<br>
Servers > Databases > <br>
dsmovie (exemplo de nome de banco de dados)<br>
Schemas<br>
public<br>
Botão direito do mouse com seta sobre Tables<br>
Clicar em Query Tool<br>
Copiar o código de create.sql e executar o script clicando em Run (pode ser preciso selecionar todo o código antes)<br>

Lembrar de configurar porta, usuário e senha para o banco de dados em src/main/resources/application-dev.properties:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/dsmovie
spring.datasource.username=postgres
spring.datasource.password=1234567
spring.datasource.driver-class-name=org.postgresql.Driver
```
A senha acima deve ser a mesma usada no momento de instalação/configuração do PostgreSQL. (1234567 foi usada em contexto de estudos).<br>

Nesse momento, sempre que se executar a aplicação no perfil dev, deve ser possível acessar o banco de dados, usando requisições, por meio do Postman, por exemplo.<br>

#### Usando Postman
Baixar a aplicação do Postman.<br>
Criar, ou importar uma coleção de requisições.<br>
Obs: neste repositório, há o arquivo postman-requests-collection.json para demonstração.<br>

host usado no Postman para as requisições para testes locais:<br>
http://localhost:8080
<br>
ou<br>
{{host}} (em caso de criação de variável de ambiente)

### Com Docker:
No caso de se usar Docker em testes locais, considerar o seguinte:<br>
* Instalar Docker Desktop (Windows exige WSL2)
* Criar uma rede com docker-compose.yml para PostgreSQL e PgAdmin (ver na raiz do DSMovie-Monorepo, onde estão as portas, usuários e senhas para a rede docker)
* Lembrar de trocar a porta de 5432 para 5433 em src/main/resources/application-dev.properties
```
spring.datasource.url=jdbc:postgresql://localhost:5433/dsmovie
```

#### Sequência correta para executar a aplicação com Docker:
Executar Docker Desktop<br>
No terminal aberto na pasta onde há o docker-compose.yml, executar o seguinte comando:
```
docker compose up -d
```
No navegador, acessar PgAdmin pela seguinte URL:<br>
http://localhost:5051
<br>Ver usuário e senha no docker-compose.yml<br>
Criar servidor, banco de dados, tabelas e inserir dados com o mesmo passo a passo usado para testes locais sem Docker (ver mais acima)<br>
Executar aplicação na IDE.<br>
Fazer testes de requisições no Postman (com o host http://localhost:8080, seguido das respectivas rotas das requisições).<br>


## Perfil prod (Criar conta em servidor):
Observação:<br>
Neste caso, foi criada conta no Raiway, onde foram hospedados o projeto de Back-end e o banco de dados (Postgres).

Criar uma conta no Railway com Github (ou outro provedor de Git que se use).

## Implantar banco de dados PostgreSQL no Railway.
Para prover um servidor de banco de dados no Railway:<br>
No dashboard, clicar em [+ new]  (ou new Project, o texto do botão pode mudar).
Optar por criar uma instância do Postgres (a criação pode levar alguns minutos).<br>
Clicar em Database:
<img width="100%" alt="criar base de dados no Railway" src="./docs/assets/create-database-railway.png" />

Clicar no banco de dados que se quer criar (PostgreSQL):
<img width="100%" alt="Escolher o banco de dados Postgres" src="./docs/assets/create-postegres-database.png" />

Instância do banco de dados criada:
<img width="100%" alt="Painel do banco de dados criado" src="./docs/assets/railway-database-manager.png" />

Em relação à tela da imagem acima,
* na aba Query, pode-se enviar consultas;
* na aba logs, pode-se ver os logs etc.;
* na aba Data, aparece a mensagem “You have no tables” (indicando não haver tabelas).  

Criar o banco de dados com as tabelas. Para isso:
no PgAdmin, no PC, criar um servidor novo:

<img width="100%" alt="Servidor criado no PgAdmin para banco no Railway" src="./docs/assets/create-server.png" />

Na aba General, dar um nome para o servidor: 
<img width="100%" alt="Dar nome aonovo servidor" src="./docs/assets/server-name.png" />

Copiar o valor da variável DATABASE_PUBLIC_URL, abaixo mostrado (sua localização pode mudar de acordo com modificações no site; neste caso, essa variável foi encontrada na aba Variables):
<img width="100%" alt="DATABASE_PUBLIC_URL" src="./docs/assets/database-public-url.png" />
O valor de DATABASE_URL, também mostrado na imagem acima, é utilizado para conexões internas no Railway.

Exemplo de valor de DATABASE_PUBLIC_URL:
```
postgresql://postgres:Oecl-senha_entre_dois-pontos_e_arroba-jvo@interchange.proxy.rlwy.net:27835/railway
```

Destaque para dados a serem usados, retirados do valor acima:<br>
postgresql://<br>
Usuário:<br>
postgres<br>
Senha:<br>
Oecl-senha_entre_dois-pontos_e_arroba-jvo<br>
host:<br>
interchange.proxy.rlwy.net<br>
Porta:<br>
27835<br>
Base de dados:<br>
railway<br>

No PgAdmin, na aba Connection, inserir os dados de conecção com o Postgres criado. Os dados de conecção são obtidos a partir de trechos do valor da variável DATABASE_PUBLIC_URL copiado do Railway:

Os dados acima são passados para os seguintes campos da aba Connection no PgAdmin, para criar o novo servidor:<br>
O host é passado para o campo host name/address: interchange.proxy.rlwy.net
<img width="100%" alt="Campo host" src="./docs/assets/host.png" />

O valor da porta é passado para o campo Port: 27835
<img width="100%" alt="Campo port" src="./docs/assets/port.png" />

O nome da base de dados é colocado no campo Maintenance database: railway
<img width="100%" alt="Campo Maintenance database" src="./docs/assets/database.png" />

No campo username, coloca-se o usuário: postgres
<img width="100%" alt="Campo username" src="./docs/assets/username.png" />

No campo password, colocar a senha, e clicar no interruptor para salvar (save password):
<img width="100%" alt="Campo password" src="./docs/assets/password.png" />

Na aba Advanced, colocar railway no campo DB restriction:
<img width="100%" alt="Campo DB restriction" src="./docs/assets/db-restriction.png" />
Preencher o nome do banco de dados na aba Advanced aplica um filtro no PgAdmin que oculta bases irrelevantes do servidor, permitindo localizar e gerenciar rapidamente o banco na nuvem.

Na parte de baixo da caixa de diálogo para as configurações, clicar no botão Save. Se tudo tiver sido corretamente configurado, deve ser possível acessar a base de dados no Railway com o PgAdmin (já se podendo fazer o seed com o código contido em create.sql).
<img width="100%" alt="Caminho até tabelas" src="./docs/assets/database-path.png" />

Em Tables, percebe-se não haver tabelas ainda. Para criar, com a seta do mouse sobre Tables, clicar no botão direito e acessar Query tool. Em Query tool, colar o código contido em create.sql e executar.<br>
Selecionar todo o código do script e executar (script de create.sql) no Query tool:
<img width="100%" alt="Script colado no Query Tool" src="./docs/assets/script-in-query-tool.png" />

Pode ser perguntado se se quer executar o script.<br>
Mensagem de sucesso na parte de baixo do Query tool:
<img width="100%" alt="Query returned successfully" src="./docs/assets/query-tool-successfully.png" />
	 
Seta do mouse sobre Tables, clique no botão direito, clique em Refresh (as tabelas devem aparecer):
<img width="100%" alt="Imagem das tabelas criadas" src="./docs/assets/tables.png" />

Para ver o conteúdo das tabelas:<br>
Seta do mouse sobre a tabela;<br>
Clicar no botão direito do mouse;<br>
Selecionar View /Edit Data;<br>
Clicar em All Rows.<br>
Deve ser possível ver a tabela (se a tabela ainda não tiver sido povoada, aparecem somente os cabeçalhos dela).<br>
Conteúdo da tabela tb_movie:
<img width="100%" alt="Tabela movie" src="./docs/assets/movie-table.png" />

A imagem acima mostra os valores originais para o campo image. Posteriormente, mudou-se esse valor, que passa a fazer referência para as imagens contidas no frontend, em public/img (imagens adicionadas ao projeto frontend para evitar quebras em caso de indisponibilidade de imagens a partir das URLs originais).

Com isso, a base de dados foi criada e povoada no Railway.


## Implantar projeto de Back-end no Railway.

Criar uma instância no Railway de uma aplicação vinculada ao Github.<br>
O repositório DSMovie-Monorepo tem na subpasta backend o projeto de Back-end.<br>

No Railway<br>
No dashboard, clicar em + New (+ New Project).<br>
Clicar em Github repository:
<img width="100%" alt="" src="./docs/assets/github-repository.png" />

Clicar em Configure Github App:
<img width="100%" alt="" src="./docs/assets/configure-github-app.png" />
Na imagem acima, percebe-se já haver o repositório DSCommerce-Backend. Ele está listado porque já havia sido criado uma instância para ele, que foi deletada depois. No Railway, em contexto de estudos, é possível deletar a conta e criar outra para usar a “amostra gratuita”.<br>
Escolher o usuário que se tem na conta do Github, se se tiver mais de um. Ou, se se tiver apenas um, entrar com a senha e confirmar:
<img width="100%" alt="Sign in - Github" src="./docs/assets/sign-in-github.png" />

Na seguinte parte da próxima tela, marcar a opção Only select repositories, escolhendo-se o repositório DSMovie-Monorepo a partir do botão Select repositories:
<img width="100%" alt="Selecionar repositório" src="./docs/assets/only-select-repositories.png" />

Se já tiver sido criada uma instância para um repositório anteriormente, ao se selecionar o DSMovie-Monorepo, haverá também os repositórios anteriormente usados para criar instâncias. Deve-se desmarcar os repositórios que não serão usados para criar a instância. Neste caso, deixa-se apenas DSMovie-Monorepo selecionado.<br>
Clicando-se em Save, na parte acima, é dada permissão ao Railway para ler do repositório Github acima indicado.<br>

Clicar para voltar para dashboard.<br>
Clicar em + New).
Se se tiver uma instância vazia, de um projeto anteriormente deletado, para o caso de se usar o espaço disponível para este outro projeto em contexto de conta gratuita, não será possível criar outra.
Na imagem abaixo, exemplo de instância vazia ao se deletar um projeto na intensão de se reaproveitar o espaço:
<img width="100%" alt="Instância vazia" src="./docs/assets/empty-instance.png" />
Para dar segmento, clica-se nessa instância vazia, mostrada na página acima (ao lado da instância do banco de dados, anteriormente já criado).
Clica-se em Github repository:
<img width="100%" alt="Repositório Github" src="./docs/assets/github-repository2.png" />

Em seguida, clica-se no nome do repositório DSMovie-Monorepo:
<img width="100%" alt="Clicar em DSMovie-Monorepo" src="./docs/assets/click-dsmovie-monorepo.png" />

Se não for apresentada a opção criar variáveis, ou implantar diretamente, ainda assim é possível adicionar variáveis.

Na aba Variables, adicionar variável APP_PROFILE, contida em src/main/resources/application.properties. Essa variável terá o valor prod no Railway, usando as configurações contidas em application-prod.properties.<br>
Clicar em New variable:
<img width="100%" alt="Clicar para configurar variáveis" src="./docs/assets/variables.png" />
Adicionar a variável APP_PROFILE e o valor prod, clicando-se em add:
<img width="100%" alt="Inserir APP_PROFILE" src="./docs/assets/app-profile.png" />
Lembrar de não deixar espaços em branco no campo ao inserir os valores das variáveis.

Fazer o mesmo com as variáveis contidas em src/main/resources/application-prod.properties (variáveis de conexão com o banco de dados, que aparecem nas três seguintes linhas):
``` Java
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```
Variáveis e valores:<br>
DB_URL = URL do banco de dados<br>
DB_USERNAME = nome do banco de dados<br>
DB_PASSWORD = senha do banco de dados<br>

Modelo da URL do banco de dados, do valor que deve ficar em DB_URL:
```
jdbc:postgresql://host:porta/nomedabase
```
Completa-se a URL acima com o host, a porta e o nome da base de dados, valores retirados de DATABASE_PUBLIC_URL, da instância criada para o banco de dados Postgres.

Valor de DB_URL:
```
jdbc:postgresql://interchange.proxy.rlwy.net:27835/railway
```
Valor de DB_USERNAME:<br>
Postgres<br>
Valor de DB_PASSWORD:<br>
Oecl-senha_entre_dois-pontos_e_arroba-jvo<br>
Host para acesso externo:<br>
interchange.proxy.rlwy.net<br>
Porta:<br>
27835<br>
Base de dados:<br>
railway
<img width="100%" alt="URL da base de dados" src="./docs/assets/db-url.png" />

Valor do usuário em DB_USERNAME:
<img width="100%" alt="Nome da base de dados" src="./docs/assets/db-username.png" />

Valor da senha em DB_PASSWORD:
<img width="100%" alt="Senha da base de dados" src="./docs/assets/db-password.png" />

Na variável CORS_ORIGINS, é especificado quais hosts, endereços, estão autorizados a acessar a API (o Back-end). O endereço do projeto de Front-end, quando já implantado, é passado para a variável CORS_ORIGINS.<br> 
Em src/main/resources/application.properties, também se pode deixar a seguinte linha, que permite o acesso por padrão dos dois hosts abaixo:
```
cors.origins=${CORS_ORIGINS:http://localhost:5173,http://localhost:3000}
```
Neste momento, se o repositório no Github não fosse um monorepo, o build e o deploy já ocorreriam sem erros. Mas, se o projeto de Back-end estiver em uma subpasta em um monorepo, como o DSMovie-Monorepo, deve-se fazer a configuração para que o Railway considere essa subpasta backend para fazer o build, já que é nela que há o arquivo pom.xml.
```
DSMovie-Monorepo/
├── backend/
├── frontend/
└── README.md
└── docker-compose.yml
```
Se o Railway tenta executar o projeto na raiz do repositório DSMovie-Monorepo, ele não encontra o pom.xml (ou build.gradle) e o deploy falha. (Railway tenta construir a raiz do repositório DSMovie-Monorepo, ao invés da pasta backend)
<br>
Configurar para que o Railway faça Build e Deploy a partir do projeto de Back-end, contido na subpasta backend de DSMovie-Monorepo:<br>
Settings > Source
<img width="100%" alt="Selecionar pasta backend em add root directory" src="./docs/assets/add-root-directory.png" />
Na tela da imagem acima, clicar no link Add Root Directory (used for build and deploy steps...<br>
Adicionar o termo backend (pasta do projeto de Back-end, na qual deve estar o pom.xml).
<br>
Clicar para fazer o build e o deploy (se não estiver configurado para ocorrer automaticamente).<br>
Neste ponto, deve ocorrer o build e o deploy sem erros:
<img width="100%" alt="Build e Deploy ocorrendo" src="./docs/assets/build-and-deploy.png" />

Se houver algum erro, aparecerá algo como o seguinte:
<img width="100%" alt="Falha durante build e deploy" src="./docs/assets/build-and-deploy-failed.png" />
Nesse caso, acessa-se o log para investigar o motivo do erro.<br>

Outra coisa que pode ocorrer é um status CRASHED, que pode indicar que o Build e o Deploy ocorreram, mas que houve algum problema: com a URL de acesso ao banco de dados, ou com outros valores como o usuário ou a senha do banco de dados (por exemplo).<br>

Não ocorrendo erro, após alguns minutos, aparecerá o seguinte status (ACTIVE):
<img width="100%" alt="Sucesso no build e deploy" src="./docs/assets/deployment-successful.png" />

### Configurar um domínio público para a aplicação.<br>
No projeto DSMovie-Monorepo, no Railway,<br> 
acessar Settings;<br>
localizar Domains (pode-se expor um domínio público);<br>
clicar para gerar um domínio automaticamente;<br>
<img width="100%" alt="Gerar domínio" src="./docs/assets/generate-domain.png" />
 
Domínio criado:<br>
dsmovie-monorepo-production.up.railway.app
```
https://dsmovie-monorepo-production.up.railway.app
```
<img width="100%" alt="Domínio criado" src="./docs/assets/domain-created.png" />
Copiar o endereço criado:<br>
A URL acima criada pode ser passada para o navegador e o resultado deve ser a página padrão do Spring Boot para confirmar o sucesso da criação da aplicação:
<img width="100%" alt="Página de confirmação do Spring Boot" src="./docs/assets/whitelabel-error-page.png" />

Se se acrescentar os caminhos das requisições, pode-se acessar seus dados no navegador.<br>
No exemplo abaixo, busca-se os filmes no caminho /movies:
```
https://dsmovie-monorepo-production.up.railway.app/movies
```
<img width="100%" alt="Listagem de filmes no navegador" src="./docs/assets/endpoint-movies.png" />

No Postman, nas URLs das requisições, trocar http://localhost:8080 pela URL usada no navegador.<br>
Exemplo da requisição Movies:
<img width="100%" alt="Endpoint Movies no Postman" src="./docs/assets/postman-endpoint-movies.png" />

Ao se clicar em Send para testar a requisição, os dados devem ser buscados na nuvem, devendo aparecer a listagem de filmes, com o status 200.

Para criar variável de ambiente no Postman para o domínio criado para acesso na nuvem, cria-se um ambiente:<br>
File > New > Enviroment

Dá-se um nome para o ambiente criado (dsmovie-enviroment, por exemplo).<br>

Cria-se a variável com o valor do domínio da API na nuvem:<br>
host | https://dsmovie-monorepo-production.up.railway.app

Criado e salvo o ambiente, ele é selecionado no lado direito superior no Postman.

Coloca-se {{host}} no lugar de http://localhost:8080, como mostrado abaixo no exemplo de requisição:
<img width="100%" alt="Variável de ambiente host" src="./docs/assets/host-variable.png" />

Na URL da requisição, como mostrado na imagem acima, troca-se o domínio para testes locais, pela variável host entre pares de chaves.

Testar. Se não ocorrer erro, pode-se colocar {{host}} nas demais requisições.

Obs.: banco de dados e API poderiam ser implantados na mesma instância no Railway.

## Sobre diretrizes de segurança para bancos de dados em nuvem
### Fase 1: arquitetura e isolamento de rede (antes de criar o banco):
* Redes privadas (VPC/Subnets): nunca expor o banco diretamente à internet pública. Colocá-lo em uma sub-rede privada dentro da nuvem.
* Firewalls e Grupos de Segurança: bloquear todas as portas de entrada por padrão. Liberar a porta do banco (ex: 5432 do Postgres) estritamente para os IPs da aplicação do responsável autorizado ou da VPN da empresa. 
* Acesso via Bastion Host / SSH Tunnel: Para os desenvolvedores acessarem o banco via pgAdmin, eles devem passar por um servidor intermediário seguro (Bastion) usando chaves SSH criptografadas.
* Conexões VPN/Cloudflare Tunnel: utilizar túneis autenticados e criptografados para que o tráfego da equipe até a nuvem não passe pela internet aberta.

### Fase 2: configuração e Autenticação (No momento da criação):
* Criptografia em repouso (At Rest): ativar a criptografia nos discos do servidor de banco de dados usando chaves gerenciadas (como AWS KMS). Em caso de roubo do disco, os dados são ilegíveis.
* Criptografia em trânsito (In Transit): forçar o uso de conexões SSL/TLS obrigatórias para qualquer cliente que tente se conectar ao banco.
* Princípio do menor privilégio (PoLP): nunca usar o usuário postgres ou root na aplicação. Criar usuários específicos: um para a app (apenas ler/escrever), um para migrações (que pode alterar tabelas) e um para cada desenvolvedor (analítico).
* Integração com IAM / Provedores de Identidade: Em grandes empresas, integrar o acesso ao banco com o Active Directory ou Okta. Remover o uso de senhas estáticas e adicionar tokens temporários.

### Fase 3: blindagem dos Gerenciadores (No PC dos Desenvolvedores):
* Senha mestra obrigatória: configurar o pgAdmin/DBeaver para exigir uma senha complexa ao ser iniciado, bloqueando o acesso caso a máquina física seja roubada ou invadida.
* Proibição de Senhas Salvas: estabelecer como política da empresa que senhas de ambientes de produção nunca sejam marcadas como "salvar senha" nos gerenciadores locais.
* Políticas de endpoint (MDM): as máquinas dos desenvolvedores devem ter antivírus ativo, criptografia de disco de fábrica (BitLocker/FileVault) e bloqueio de tela automático após 1 minuto de inatividade.

### Fase 4: operação, monitoramento e auditoria (com o banco em produção):
* Logs de auditoria (pgAudit): ativar a extensão de auditoria no banco de dados para registrar detalhadamente quem leu ou alterou tabelas sensíveis (como dados de clientes ou financeiros).
* Mascaramento de dados (Data Masking): garantir que dados sensíveis (CPF, cartões de crédito) apareçam borrados ou modificados quando desenvolvedores fizerem consultas em ambientes de homologação ou testes.
* Análise de vulnerabilidades automatizada: utilizar ferramentas que varrem o banco em busca de configurações fracas, privilégios excessivos ou falta de patches de segurança.
* Gestão de segredos (Secret Managers): nunca salvar a senha do banco no código-fonte do GitHub. Usar serviços como AWS Secrets Manager, HashiCorp Vault ou as variáveis protegidas do Railway para injetar a senha em tempo de execução.

### Fase 5: continuidade de Negócios e resiliência (plano de Contingência):
* Backups criptografados e isolados: configurar backups automáticos diários. Garantir que os arquivos de backup estejam criptografados e armazenados em uma conta de nuvem separada (para evitar exclusão por ransomware).
* Testes de restauração periódicos: um backup que nunca foi testado não é um backup. Simular mensalmente a recuperação do banco para garantir que os dados não estão corrompidos.

