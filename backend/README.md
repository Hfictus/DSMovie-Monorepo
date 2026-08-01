# Passo a passo para implantação no Railway.


## Criar conta em servidor.
### Observação:
Neste caso, foi criada conta no Raiway, onde foram hospedados o projeto de Back-end e o banco de dados (Postgres).

Criar uma conta no Railway com Github (ou outro provedor de Git que se use).

## Implantar banco de dados PostgreSQL no Railway.
Para prover um servidor de banco de dados no Railway:
No dashboard, clicar em [+ new]  (ou new Project, o texto do botão pode mudar).

Optar por criar uma instância do Postgres (a criação pode levar alguns minutos). Clicar em Database:
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
No PgAdmin, no PC, criar um servidor novo:

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

No campo password, colocar a senha, e clicar no interruptor para salvar a senha (save password):
<img width="100%" alt="Campo password" src="./docs/assets/password.png" />

Na aba Advanced, colocar railway no campo DB restriction:
<img width="100%" alt="Campo DB restriction" src="./docs/assets/db-restriction.png" />
Colocar o nome da base de dados em Advanced permite restringir a base de dados em um contexto em que há compartilhamento no banco de dados entre várias bases de dados.    

Na parte de baixo da caixa de diálogo para as configurações, clicar no botão Save. Se tudo tiver sido corretamente configurado, deve ser possível acessar a base de dados no Railway com o PgAdmin (já se podendo fazer o seed com o código contido em create.sql).
<img width="100%" alt="Caminho até tabelas" src="./docs/assets/database-path.png" />

Em Tables, percebe-se não haver tabelas ainda. Para criar, com a seta do mouse sobre Tables, clicar no botão direito do mouse e acessar Query tool. Em Query tool, colar o código contido em create.sql e executar.<br>
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



