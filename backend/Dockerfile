# --- Etapa 1: Build da aplicacao ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia os arquivos de configuracao do Maven para baixar as dependencias
COPY pom.xml .

# Baixa as dependências antes de copiar o codigo (otimiza o cache do Docker)
RUN mvn dependency:go-offline

# Copia o codigo fonte do projeto
COPY src ./src

# Compila o projeto e gera o .jar (pulando os testes para agilizar o build)
RUN mvn clean package -DskipTests

# --- Etapa 2: Ambiente de Execucao ---
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copia o .jar gerado na etapa anterior para esta imagem limpa
COPY --from=build /app/target/*.jar app.jar

# Expoe a porta padrao do Spring Boot
EXPOSE 8080

# Comando para rodar a aplicacao
ENTRYPOINT ["java", "-jar", "app.jar"]